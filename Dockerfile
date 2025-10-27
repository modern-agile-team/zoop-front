# 정적 사이트를 serve로 띄우는 가장 단순 버전
FROM node:20-alpine
WORKDIR /app

# 경량 정적 서버
RUN npm install -g serve

# 빌드 산출물 복사 (배포 시점에 releases/build를 rsync로 채워둠)
COPY releases/build ./build

# 포트: Actions에서 --build-arg PORT=xxxx 로 주입
ARG APP_PORT
ENV PORT=$APP_PORT
EXPOSE $PORT

# 반드시 sh -c 로 변수치환 + 올바른 listen 형식
CMD ["sh", "-c", "serve -s build -l tcp://0.0.0.0:${PORT}"]
