import { SimpleForm, TextInput, Edit } from 'react-admin';

const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" label="ID" />
        <TextInput source="title" label="Title" aria-required="true" />
        <TextInput
          source="imageSrc"
          label="Image Source"
          aria-required="true"
          required
        />
      </SimpleForm>
    </Edit>
  );
};

export default CourseEdit;
