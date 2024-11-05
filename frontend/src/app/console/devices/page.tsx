'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  useCreateSensorMutation,
  useListSensor,
  type Sensor,
} from '@/services/sensor';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const useColumns: () => ColumnDef<Sensor>[] = () => [
  {
    accessorKey: 'name',
    header: 'Name',
    enableHiding: false,
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'id',
    header: 'Device ID',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="line-clamp-1 capitalize">{row.getValue('id')}</div>
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
  const router = useRouter();
  const { data: sensorList } = useListSensor();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = useColumns();

  const table = useReactTable({
    data: sensorList?.data || [],
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
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`/console/devices/${row.original.id}`);
                  }}
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
  deviceID: z.string(),
  name: z.string(),
});

function AddDeviceDialog() {
  const closeDialogRef = React.useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const createSensorMutation = useCreateSensorMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listSensor'] });
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
      deviceID: '',
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchemaAddDevice>) {
    createSensorMutation.mutate([
      {
        body: {
          deviceId: values.deviceID as unknown as object,
          name: values.name,
          type: 'thermometer',
        },
      },
    ]);
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
                name="deviceID"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Device ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Example. 123e4567-e89b-12d3-a456-426614174000"
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
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Example. Bedroom" {...field} />
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
