import { gql } from 'graphql-request';
import { fetchGQL, fetchStaticGQL } from '@lib/fetchGraphQL';

const queryNotes = gql`
  {
    notes {
      user_id
      last_modified
      id
      created_at
      content_id
      body
    }
  }
`;

const addNote = gql`
  mutation Add_note($object: notes_insert_input!) {
    insert_notes_one(object: $object) {
      id
      user_id
      body
      title
      content_id
      created_at
      last_modified
    }
  }
`;

const deleteNote = gql`
  mutation DeleteNote($id: uuid!) {
    delete_notes_by_pk(id: $id) {
      id
    }
  }
`;

const editNote = gql`
  mutation EditNote(
    $_set: notes_set_input
    $pk_columns: notes_pk_columns_input!
  ) {
    update_notes_by_pk(_set: $_set, pk_columns: $pk_columns) {
      id
      user_id
      body
      content_id
      created_at
      last_modified
    }
  }
`;

export const notes = {
  get: () => fetchGQL(queryNotes),
  getStatic: () => fetchStaticGQL(queryNotes),
  add: (note) => fetchGQL(addNote, { object: { ...note } }),
  delete: (noteId) => fetchGQL(deleteNote, { id: noteId }),
  edit: (note) =>
    fetchGQL(editNote, {
      _set: { body: note.body },
      pk_columns: { id: note.id },
    }),
};
