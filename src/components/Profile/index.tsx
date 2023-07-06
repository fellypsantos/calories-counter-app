import { Container, Name, Phrase, ProfilePicture, ProfilePictureContainer } from "./styles";

const profilePictureMale = require('../../../assets/images/man.png');
const profilePictureFemale = require('../../../assets/images/girl.png');

export default function Profile() {
  return (
    <Container>
      <ProfilePictureContainer>
        <ProfilePicture source={profilePictureMale} />
      </ProfilePictureContainer>
      <Name>Fellyp Santos</Name>
      <Phrase>Fax o pix.</Phrase>
    </Container>
  );
}
