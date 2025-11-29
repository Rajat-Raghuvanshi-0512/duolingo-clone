import {
  SimpleForm,
  TextInput,
  Edit,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from 'react-admin';

const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" label="ID" />
        <TextInput source="question" label="Question" aria-required="true" />
        <ReferenceInput source="lessonId" reference="lessons" />
        <SelectInput
          source="type"
          label="Type"
          aria-required="true"
          choices={[
            { id: 'SELECT', name: 'Select' },
            { id: 'ASSIST', name: 'Assist' },
          ]}
        />
        <NumberInput source="order" label="Order" aria-required="true" />
      </SimpleForm>
    </Edit>
  );
};

export default ChallengeEdit;
