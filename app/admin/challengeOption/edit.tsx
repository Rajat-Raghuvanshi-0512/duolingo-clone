import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  BooleanInput,
  Edit,
  NumberInput,
} from 'react-admin';

const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" label="ID" />
        <TextInput source="text" label="Text" aria-required="true" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <BooleanInput source="correct" label="Correct" />
        <TextInput source="imageSrc" label="Image Source" />
        <TextInput source="audioSrc" label="Audio Source" />
      </SimpleForm>
    </Edit>
  );
};

export default ChallengeOptionEdit;
