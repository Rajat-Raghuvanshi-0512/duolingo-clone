import { SimpleForm, Create, TextInput, ReferenceInput } from 'react-admin';

const LessonCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" label="Title" aria-required="true" />
        <ReferenceInput source="unitId" reference="units" />
        <TextInput source="order" label="Order" aria-required="true" />
      </SimpleForm>
    </Create>
  );
};

export default LessonCreate;
