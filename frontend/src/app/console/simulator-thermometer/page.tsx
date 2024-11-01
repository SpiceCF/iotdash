'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  useCreateThermometerMutation,
  useListThermometer,
  useStartThermometerMutation,
  useStopThermometerMutation,
  type Thermometer,
} from '@/services/thermometer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const useColumns: (config: {
  onActiveChange: (id: string, isActive: boolean) => void;
}) => ColumnDef<Thermometer>[] = ({ onActiveChange }) => [
  {
    accessorKey: 'id',
    header: 'Device ID',
    enableHiding: false,
    cell: ({ row }) => (
      <Link
        href={`/console/simulator-thermometer/${row.getValue('id')}`}
        className="line-clamp-1 capitalize"
      >
        {row.getValue('id')}
      </Link>
    ),
  },
  {
    accessorKey: 'config',
    header: 'Config',
    cell: ({ row }) => {
      const config = row.getValue('config') as Thermometer['config'];

      return (
        <div className="capitalize">
          Min: {config?.minTemperature} , Max: {config?.maxTemperature}
        </div>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="capitalize">
        <Switch
          checked={row.getValue('isActive')}
          onCheckedChange={(isChecked) => {
            onActiveChange(row.getValue('id'), isChecked);
          }}
        />
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const device = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                throw new Error(
                  `Not implemented for setting action ${device.id}`
                );
              }}
            >
              Setting
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                throw new Error(
                  `Not implemented for delete action ${device.id}`
                );
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Page() {
  const queryClient = useQueryClient();
  const { data: thermometerList } = useListThermometer();
  const startThermometerMutation = useStartThermometerMutation();
  const stopThermometerMutation = useStopThermometerMutation();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const onActiveChange = (id: string, isActive: boolean) => {
    if (isActive) {
      startThermometerMutation.mutateAsync({ id }).then((res) => {
        if (res.status !== 200) return;
        toast({
          title: 'Device started successfully',
        });
        queryClient.invalidateQueries({ queryKey: ['listThermometer'] });
      });
      return;
    }

    stopThermometerMutation.mutateAsync({ id }).then((res) => {
      if (res.status !== 200) return;
      toast({
        title: 'Device stopped successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['listThermometer'] });
    });
  };

  const columns = useColumns({ onActiveChange });

  const table = useReactTable({
    data: thermometerList?.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 py-4">
        <div className="flex gap-2">
          <Input
            placeholder="Filter device ID..."
            value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('id')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex">
          <AddDeviceDialog />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

const formSchemaAddDevice = z.object({
  connection: z.string(),
  minTemperature: z.number(),
  maxTemperature: z.number(),
});

function AddDeviceDialog() {
  const closeDialogRef = React.useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const createThermometerMutation = useCreateThermometerMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listThermometer'] });
      toast({
        title: 'Device created successfully',
      });
      closeDialogRef.current?.click();
    },
    onError: (error) => {
      toast({
        title: `Failed to create device, ${error.message}`,
      });
    },
  });

  const formAddDevice = useForm<z.infer<typeof formSchemaAddDevice>>({
    resolver: zodResolver(formSchemaAddDevice),
    defaultValues: {
      connection: 'http://localhost:8080/api/v1/sensors/thermometer/logs',
      minTemperature: 10,
      maxTemperature: 100,
    },
  });

  function onSubmit(values: z.infer<typeof formSchemaAddDevice>) {
    createThermometerMutation.mutate({
      body: {
        config: {
          connection: values.connection,
          minTemperature: values.minTemperature,
          maxTemperature: values.maxTemperature,
        },
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Device</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="add-device-dialog"
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Device</DialogTitle>
        </DialogHeader>

        <Form {...formAddDevice}>
          <form
            onSubmit={formAddDevice.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <div className="flex flex-row gap-4">
              <FormField
                control={formAddDevice.control}
                name="connection"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Connection</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Example. http://localhost:8080/api/v1/sensors/thermometer/logs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-4">
              <FormField
                control={formAddDevice.control}
                name="minTemperature"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Min Temperature*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Example. 30"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formAddDevice.control}
                name="maxTemperature"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Max Temperature*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Example. 50"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Add Device</Button>
            </div>
          </form>
        </Form>
        <DialogClose ref={closeDialogRef} />
      </DialogContent>
    </Dialog>
  );
}
