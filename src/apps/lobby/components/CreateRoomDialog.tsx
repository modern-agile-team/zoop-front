import { useState } from 'react';

import type { CreateGameRoomDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

import { GAME_SETTINGS } from '../constants';

interface CreateRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateRoom: (roomInfo: CreateGameRoomDto) => void;
}

export default function CreateRoomDialog({
  open,
  onOpenChange,
  onCreateRoom,
}: CreateRoomDialogProps) {
  const [roomTitle, setRoomTitle] = useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새로운 게임 방 만들기</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="roomTitle">방 제목</Label>
            <Input
              id="roomTitle"
              placeholder="재밌는 퀴즈 게임에 참여하세요!"
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              게임 설정
            </h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 최대 인원: {GAME_SETTINGS.MAX_PLAYERS}명</li>
              <li>• 문제 수: {GAME_SETTINGS.TOTAL_QUESTIONS}문제</li>
              <li>• 제한 시간: 문제당 {GAME_SETTINGS.TIME_PER_QUESTION}초</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button
            onClick={() =>
              onCreateRoom({
                title: roomTitle,
                quizzesCount: GAME_SETTINGS.TOTAL_QUESTIONS,
              })
            }
            disabled={!roomTitle.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            방 만들기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
