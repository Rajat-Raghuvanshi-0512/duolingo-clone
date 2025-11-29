import { SimpleForm, Create, TextInput } from 'react-admin';

const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" label="Title" aria-required="true" />
        <TextInput
          source="imageSrc"
          label="Image Source"
          aria-required="true"
          required
        />
      </SimpleForm>
    </Create>
  );
};

export default CourseCreate;
