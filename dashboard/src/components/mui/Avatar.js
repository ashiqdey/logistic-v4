/* eslint-disable no-constant-condition */

// @mui
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

// utils
import createAvatar from '../../utils/createAvatar';
//
import CustomAvatar from '../micro/Avatar';

// -----------------------------------------------

export default function MuiAutocomplete() {
  const user = { displayName: null };

  return (<>
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/assets/mock/avatars/1.jpg" />

      <CustomAvatar
        src={user?.photoURL}
        alt={user?.displayName}
        color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      >
        {createAvatar(user?.displayName).name}
      </CustomAvatar>





      <CustomAvatar
        src=""
        alt="Abhi"
        color={"" ? 'default' : createAvatar("Abhi").color}
      >
        {createAvatar("Abhi").name}
      </CustomAvatar>


      <CustomAvatar
        src=""
        alt="Fais"
        color={"" ? 'default' : createAvatar("Fais").color}
      >
        {createAvatar("Fais").name}
      </CustomAvatar>

      <CustomAvatar
        src=""
        alt="Krishna"
        color={"" ? 'default' : createAvatar("Krishna").color}
      >
        {createAvatar("Krishna").name}
      </CustomAvatar>

      <CustomAvatar
        src=""
        alt="Prasad"
        color={"" ? 'default' : createAvatar("Prasad").color}
      >
        {createAvatar("Prasad").name}
      </CustomAvatar>

      <CustomAvatar
        src=""
        alt="Violina"
        color={"" ? 'default' : createAvatar("Violina").color}
      >
        {createAvatar("Violina").name}
      </CustomAvatar>




      <CustomAvatar
        src="/assets/mock/avatars/3.jpg"
        alt="Ashiq Dey"
        color={"/assets/mock/avatars/3.jpg" ? 'default' : createAvatar("Ashiq Dey").color}
      >
        {createAvatar("Ashiq Dey").name}
      </CustomAvatar>

    </Stack>
  </>);
}
