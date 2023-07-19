import { usePremium } from "../../hooks/premium";
import { useProfile } from "../../hooks/profile";
import { Container, Name, Phrase, ProfilePicture, ProfilePictureContainer } from "./styles";

const profilePictureMale = require('../../../assets/images/man.png');
const profilePictureFemale = require('../../../assets/images/girl.png');

export default function Profile() {
  const { profile } = useProfile();
  const { isPremiumTime } = usePremium();

  return (
    <Container useMarginTop={isPremiumTime}>
      <ProfilePictureContainer>
        <ProfilePicture source={profile.gender === 'M' ? profilePictureMale : profilePictureFemale} />
      </ProfilePictureContainer>
      <Name>{profile.name}</Name>
      <Phrase>{profile.phrase}</Phrase>
    </Container>
  );
}
