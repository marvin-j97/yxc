import yxc, { Infer } from "./index";

const schema = yxc.object({
  id: yxc.number(),
  firstName: yxc.string(),
  lastName: yxc.string(),
  age: yxc.number(),
  addresses: yxc.array(yxc.string()),
  something: yxc.union([yxc.string(), yxc.number().nullable()]).optional(),
  title: yxc.string().optional(),
});

type SchemaType = Infer<typeof schema>;

const songSchema = yxc.object({
  title: yxc.string().notEmpty(),
  duration: yxc.number().positive().int(),
});

type Song = Infer<typeof songSchema>;
