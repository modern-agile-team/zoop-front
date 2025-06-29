import { Button } from '@/components/ui/button';

export default function Room() {
  return (
    <div className="flex justify-between p-8 border rounded-8 border-primary-200 gap-12">
      <div className="text-white">방 제목</div>
      <div className="text-white">현재 인원 / 총 인원</div>
      <Button>방 참여하기</Button>
    </div>
  );
}
