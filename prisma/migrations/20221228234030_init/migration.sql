/*
  Warnings:

  - Added the required column `thumbnail` to the `contact` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "workplace" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    CONSTRAINT "contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_contact" ("date_of_birth", "email", "id", "name", "notes", "phone", "user_id", "workplace") SELECT "date_of_birth", "email", "id", "name", "notes", "phone", "user_id", "workplace" FROM "contact";
DROP TABLE "contact";
ALTER TABLE "new_contact" RENAME TO "contact";
CREATE UNIQUE INDEX "contact_id_key" ON "contact"("id");
CREATE INDEX "contact_user_id_idx" ON "contact"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
