import { db } from "src";

export async function getLabTests({ filter }: { filter: "accepted" | "all" }) {
  if (filter === "accepted")
    return await db.labTest.findMany({ where: { accepted: true } });

  if (filter === "all") return await db.labTest.findMany();
}
