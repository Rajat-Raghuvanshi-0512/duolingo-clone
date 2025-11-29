import { SimpleForm, TextInput, Edit, ReferenceInput } from 'react-admin';

const UnitEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" label="ID" />
        <TextInput source="title" label="Title" aria-required="true" />
        <TextInput
          source="description"
          label="Description"
          aria-required="true"
          required
        />
        <ReferenceInput source="courseId" reference="courses" />
        <TextInput source="order" label="Order" aria-required="true" />
      </SimpleForm>
    </Edit>
  );
};

export default UnitEdit;
