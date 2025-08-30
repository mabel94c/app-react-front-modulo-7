import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import type { UserType } from './type';
import { useActionState } from 'react';
import type { ActionState } from '../../interfaces';
import type { UserFormValues } from '../../models';
import { createInitialState } from '../../helpers';

export type UserActionState = ActionState<UserFormValues>;

interface Props {
  open: boolean;
  user?: UserType | null;
  onClose: () => void;
  handleCreateEdit: (
    _: UserActionState | undefined,
    formData: FormData
  ) => Promise<UserActionState | undefined>;
}
export const UserDialog = ({ onClose, open, user, handleCreateEdit }: Props) => {
  const initialState = createInitialState<UserFormValues>();

  const [state, submitAction, isPending] = useActionState(
    handleCreateEdit,
    initialState
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth>
      <DialogTitle>{user ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
      <Box key={user?.id ?? 'new'} component={'form'} action={submitAction}>
        <DialogContent>
          <TextField
            name="username"
            autoFocus
            margin="dense"
            label="Usuario"
            fullWidth
            required
            variant="outlined"
            disabled={isPending}
            defaultValue={state?.formData?.username || user?.username || ''}
            error={!!state?.errors?.username}
            helperText={state?.errors?.username}
            sx={{ mb: 2 }}
          />
          {/* Solo si es nuevo */}
 
            <TextField
              name="password"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              disabled={isPending}
              defaultValue={state?.formData?.password || user?.password || ''}
              error={!!state?.errors?.password}
              helperText={state?.errors?.password}
            />
            <TextField
              name="confirmPassword"
              margin="normal"
              required
              fullWidth
              label="Repetir password"
              type="password"
              disabled={isPending}
              defaultValue={state?.formData?.confirmPassword || user?.password || ''}
              error={!!state?.errors?.confirmPassword}
              helperText={state?.errors?.confirmPassword}
            /> 
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit" disabled={isPending}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress /> : null}
          >
            {user ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
