/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */

const { nanoid } = require("nanoid");
const notes = require('./notes');

/* eslint-disable linebreak-style */
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan Berhasil Ditambahkan!',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Ditambahkan!',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIDHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Note is not found',
    });

    response.code(404);
    return response;
};

const editNoteByIDHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updateAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Note successfully updated',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Failed to update note. ID not found',
    });

    response.code(404);
    return response;
};

const deleteNoteByIDHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id)[0];

    if (index !== 1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Note is successfully deleted',
        });
        
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Failed to delete note. ID note found.',
    });

    response.code(404);
    return response;
};

module.exports = {
 addNoteHandler, 
 getAllNotesHandler, 
 getNoteByIDHandler, 
 editNoteByIDHandler,
 deleteNoteByIDHandler,
};
