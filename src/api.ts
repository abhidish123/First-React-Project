import { User } from "./model";

const userTable: User[] = [];
export const users = userTable;

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 250));
}

export async function getUsers() {
  await delay();
  return userTable;
}

export async function upsertUser(user: User) {
  await delay();
  const existingUserIndex = userTable.findIndex(
    (existingUser) => existingUser.id === user.id
  );
  if (existingUserIndex > -1) {
    userTable[existingUserIndex] = user;
  } else {
    user.id = userTable[userTable.length - 1].id;
    userTable.push(user);
  }
}

export async function deleteUser(userId: number) {
  await delay();
  const existingUserIndex = userTable.findIndex(
    (existingUser) => existingUser.id === userId
  );
  userTable.splice(existingUserIndex, 1);
}

const fullNames = [
  "Shobhana Papa",
  "Anuprabha Sourav",
  "Ipsita Maruthi",
  "Shiuli Dhadda",
  "Pavitra Soni",
  "Lochan Salim",
  "Vasu Nandini",
  "Mukul Laddha",
  "Rosie Wallace",
  "Lexi Elliott",
  "Sophia Fletcher",
  "Zara Thomas",
  "Cody Rogers",
  "Jude Lane",
  "Blake Gordon",
  "Bradley Newman"
];

function populateUserTable() {
  let id = 0;
  for (const fullName of fullNames) {
    id++;
    const nameMatches = /(\S)+\s+(\S+)/.exec(fullName);
    const username = nameMatches
      ? `${nameMatches[2].toLowerCase()}${nameMatches[1].toLowerCase()[0]}`
      : "";
    const avatarUrl = `http://placekitten.com/200/${200 + id - 1}`;
    userTable.push({
      id,
      fullName,
      username,
      avatarUrl
    });
  }
}

populateUserTable();
