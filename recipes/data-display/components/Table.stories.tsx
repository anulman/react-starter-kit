import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, type Column } from "./Table";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const users: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Member" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "Guest" },
];

const columns: Column<User>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
];

const meta = {
  component: Table<User>,
  tags: ["autodocs"],
} satisfies Meta<typeof Table<User>>;

export default meta;
type Story = StoryObj<Meta<typeof Table<User>>>;

export const Default: Story = {
  args: {
    data: users,
    columns,
    keyExtractor: (user: User) => user.id,
  },
};

export const WithRowClick: Story = {
  args: {
    data: users,
    columns,
    keyExtractor: (user: User) => user.id,
    onRowClick: (user: User) => alert(`Clicked: ${user.name}`),
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    keyExtractor: (user: User) => user.id,
  },
};
