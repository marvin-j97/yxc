import yxc, { Infer } from "./index";

const schema = yxc.object({
  id: yxc.number(),
  firstName: yxc.string(),
  lastName: yxc.string(),
  age: yxc.number(),
  addresses: yxc.array(yxc.string()),
  something: yxc.union([yxc.string(), yxc.number().nullable()]).optional(),
  title: yxc.string().optional(),
  test: yxc.object({
    test: yxc.array(yxc.string()),
  }),
});

type SchemaType = Infer<typeof schema>;
