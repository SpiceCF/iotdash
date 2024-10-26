import { Button } from '@/components/ui/button';

export default function Index() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between px-10 py-3 border-b-2 border-primary">
          <div className="flex flex-col place-content-center font-bold">
            LOGO
          </div>
          <div className="flex">
            <Button variant="link">วิธีการใช้งาน</Button>
            <Button variant="link">สมัครสมาชิก</Button>
            <Button variant="default">เข้าสู่ระบบ</Button>
          </div>
        </div>
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}
