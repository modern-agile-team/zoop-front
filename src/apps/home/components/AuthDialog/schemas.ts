import { z } from 'zod';

export const authSchema = z.object({
  username: z
    .string()
    .min(1, '사용자명을 입력해주세요.')
    .min(3, '사용자명은 3자 이상이어야 합니다.')
    .trim(),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(6, '비밀번호는 6자 이상이어야 합니다.'),
});

export type AuthFormData = z.infer<typeof authSchema>;
