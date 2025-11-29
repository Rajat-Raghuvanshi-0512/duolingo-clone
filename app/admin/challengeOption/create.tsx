import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  BooleanInput,
} from 'react-admin';

const ChallengeOptionCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="text" label="Text" aria-required="true" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <BooleanInput source="correct" label="Correct" defaultValue={false} />
        <TextInput source="imageSrc" label="Image Source" />
        <TextInput source="audioSrc" label="Audio Source" />
      </SimpleForm>
    </Create>
  );
};

export default ChallengeOptionCreate;
