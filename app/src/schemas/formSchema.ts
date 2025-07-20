// schemas/formSchema.ts
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Введите корректный email"),
  amount: z.number().min(1, "Поле обязательно")
  // name: z
  //   .string()
  //   .min(1, "Поле обязательно")
  //   .refine((val) => val.trim().split(/\s+/).length >= 2, {
  //     message: "Введите минимум два слова",
  //   }),
  // phone: z
  //   .string()
  //   .transform((val: string) => val.replace(/\s+/g, "")) // удаляем пробелы
  //   .refine(
  //     (val) => /^[+\d-]+$/.test(val), // разрешаем +, цифры и -
  //     { message: "Допустимы только цифры, символы + и -" }
  //   )
  //   .refine(
  //     (val) => val.replace(/[^0-9]/g, "").length >= 10, // минимум 10 цифр
  //     { message: "Телефон должен содержать минимум 10 цифр" }
  //   ),
});
