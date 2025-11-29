import { SimpleForm, Create, TextInput, ReferenceInput } from 'react-admin';

const UnitCreate = () => {
  return (
    <Create>
      <SimpleForm>
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
    </Create>
  );
};

export default UnitCreate;
