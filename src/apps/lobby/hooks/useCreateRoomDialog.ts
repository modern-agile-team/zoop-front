import { useState, useCallback } from 'react';

/**
 * 방 생성 다이얼로그 관련 상태와 로직을 관리하는 커스텀 훅
 */
export const useCreateRoomDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setRoomTitle(''); // 다이얼로그를 닫을 때 제목 초기화
  }, []);

  const handleCreateRoom = useCallback(() => {
    if (roomTitle.trim()) {
      // TODO: 실제 방 생성 로직
      console.warn('방 생성:', roomTitle);
      closeDialog();
      return true; // 성공
    }
    return false; // 실패
  }, [roomTitle, closeDialog]);

  return {
    isOpen,
    roomTitle,
    setRoomTitle,
    openDialog,
    closeDialog,
    handleCreateRoom,
  };
};
