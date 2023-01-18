import { faker } from "@faker-js/faker";

const notification = [
  {
    id: faker.datatype.uuid(),
    taskID: 50001,
    minute: "1",
    content: "Nhiệm vụ cập nhật đã thu gom",
  },
  {
    id: faker.datatype.uuid(),
    taskID: 50002,
    minute: "2",
    content: "Nhiệm vụ cập nhật đã vận chuyển",
  },
  {
    id: faker.datatype.uuid(),
    taskID: 50003,
    minute: "3",
    content: "Nhiệm vụ cập nhật đã thu gom",
  },
  {
    id: faker.datatype.uuid(),
    taskID: 50004,
    minute: "7",
    content: "Nhiệm vụ cập nhật đã bắt đầu",
  },
];

export default notification;
