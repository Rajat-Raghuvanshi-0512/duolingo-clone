import { SimpleForm, TextInput, Edit, ReferenceInput } from 'react-admin';

const LessonEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" label="ID" />
        <TextInput source="title" label="Title" aria-required="true" />
        <ReferenceInput source="unitId" reference="units" />
        <TextInput source="order" label="Order" aria-required="true" />
      </SimpleForm>
    </Edit>
  );
};

export default LessonEdit;
