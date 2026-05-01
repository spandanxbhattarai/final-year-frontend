import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { createUserSchema, updateUserSchema, type CreateUserInput } from '@/schemas/user.schema';
import type { User } from '@/types';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserInput) => void;
  loading?: boolean;
  user?: User | null;
}

const roleOptions = [
  { value: 'ADMIN', label: 'Admin' },
  { value: 'STAFF', label: 'Staff' },
  { value: 'COOK', label: 'Cook' },
];

export const UserFormModal = ({ isOpen, onClose, onSubmit, loading, user }: UserFormModalProps) => {
  const isEdit = !!user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema) as any,
    defaultValues: { role: 'STAFF' },
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email, role: user.role, password: '' });
    } else {
      reset({ name: '', email: '', password: '', role: 'STAFF' });
    }
  }, [user, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit User' : 'Create User'}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Name"
          {...register('name')}
          placeholder="Full name"
          error={errors.name?.message}
        />
        <Input
          label="Email"
          {...register('email')}
          type="email"
          placeholder="email@example.com"
          error={errors.email?.message}
        />
        <Input
          label={isEdit ? 'New Password (leave blank to keep current)' : 'Password'}
          {...register('password')}
          type="password"
          placeholder={isEdit ? 'Leave blank to keep current' : 'Min 6 characters'}
          error={errors.password?.message}
        />
        <Select
          label="Role"
          {...register('role')}
          options={roleOptions}
          error={errors.role?.message}
        />
        <div className="flex gap-3 justify-end pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading}>
            {isEdit ? 'Save Changes' : 'Create User'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
