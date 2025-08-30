import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import type { UserType } from './type';
import type { ActionState } from '../../interfaces';
import type { UserFormValues } from '../../models';
import { createInitialState } from '../../helpers';
import { useActionState } from 'react';

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
  const [state, submitAction, isPending] = useActionState(handleCreateEdit, initialState);

  // Estado para visibilidad de contraseña
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
      <Box component="form" action={submitAction} key={user?.id ?? 'new'}>
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
            value={state?.formData?.username || user?.username || ''}
            onChange={(e) =>
              state.setFormData({ ...state.formData, username: e.target.value })
            }
            error={!!state?.errors?.username}
            helperText={state?.errors?.username}
            sx={{ mb: 2 }}
          />

          {/* Password */}
          <TextField
            name="password"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            disabled={isPending}
            value={state?.formData?.password || user?.password || ''}
            onChange={(e) =>
              state.setFormData({ ...state.formData, password: e.target.value })
            }
            error={!!state?.errors?.password}
            helperText={state?.errors?.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="confirmPassword"
            margin="normal"
            required
            fullWidth
            label="Repetir Password"
            type={showPassword ? 'text' : 'password'}
            disabled={isPending}
            value={state?.formData?.confirmPassword || user?.password || ''}
            onChange={(e) =>
              state.setFormData({ ...state.formData, confirmPassword: e.target.value })
            }
            error={!!state?.errors?.confirmPassword}
            helperText={state?.errors?.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            startIcon={isPending ? <CircularProgress size={20} /> : null}
          >
            {user ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
