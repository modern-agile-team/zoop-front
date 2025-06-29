import { Button } from '@/components/ui/button';

export default function Room() {
  return (
    <div className="flex justify-between p-8 border rounded-8 border-primary-200 gap-12">
      <div className="flex-1 text-white text-ellipsis overflow-hidden">
        asdkjasldkjsaldjaslkdjkalsjd
      </div>
      <div className="text-center text-white flex-1">4/8</div>
      <Button>참여하기</Button>
    </div>
  );
}
