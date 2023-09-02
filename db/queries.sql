-- get notes
SELECT title, content FROM notes;

-- get note by id
SELECT title, content FROM notes WHERE id = ?;

-- create note
INSERT INTO notes (title, content) VALUES (?, ?);

-- update note by id
UPDATE notes SET title = ?, content = ? WHERE id = ?;

-- delete note by id
DELETE FROM notes WHERE id = ?;