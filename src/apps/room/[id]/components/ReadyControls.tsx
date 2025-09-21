import { Button } from '@/shared/components/ui/button';

interface ReadyControlsProps {
  isHost: boolean;
  canStartGame: boolean;
  onStartGame: () => void;
  currentPlayers: number;
  maxPlayers: number;
}

export default function ReadyControls({
  isHost,
  canStartGame,
  onStartGame,
  currentPlayers,
  maxPlayers,
}: ReadyControlsProps) {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg border">
      <h3 className="font-medium text-gray-900 mb-4 text-center sm:text-left">
        게임 시작
      </h3>

      <div className="flex flex-col gap-3">
        {/* 방장만 보이는 게임 시작 버튼 */}
        {isHost && (
          <Button
            onClick={onStartGame}
            disabled={!canStartGame}
            size="lg"
            className="w-full"
          >
            게임 시작
          </Button>
        )}

        {/* 게임 시작 조건 안내 */}
        <div className="text-xs sm:text-sm text-gray-500 text-center px-2">
          {isHost ? (
            canStartGame ? (
              <p className="text-green-600 font-medium">
                게임을 시작할 수 있습니다!
              </p>
            ) : (
              <p>
                게임 시작을 위해 {maxPlayers}명이 필요합니다.
                <br />
                현재 {currentPlayers}/{maxPlayers}명 참여 중
              </p>
            )
          ) : (
            <p>
              방장이 게임을 시작하기를 기다리는 중입니다.
              <br />({currentPlayers}/{maxPlayers}명 참여 중)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
