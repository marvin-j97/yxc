const validEmails = `email@example.com
firstname.lastname@example.com
email@subdomain.example.com
firstname+lastname@example.com
email@123.123.123.123
1234567890@example.com
email@example-one.com
_______@example.com
email@example.name
email@example.museum
email@example.co.jp
firstname-lastname@example.com`;

const invalidEmails = `plainaddress
#@%^%#$@#$@#.com
@example.com
Joe Smith <email@example.com>
email.example.com
email@example@example.com
あいうえお@example.com
email@example.com (Joe Smith)
email@-example.com
email@example..com`;

function getLines(str: string) {
  return str.split("\n").map((s) => s.trim());
}

export default (<[string, boolean][]>[
  ...getLines(validEmails).map((email) => [email, true]),
  ...getLines(invalidEmails).map((email) => [email, false]),
]).map((tuple) => ({
  email: tuple[0],
  expected: tuple[1],
}));
