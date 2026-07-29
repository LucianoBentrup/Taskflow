import { ProfileForm } from '@/features/users/components/ProfileForm';
import { ChangePasswordForm } from '@/features/users/components/ChangePasswordForm';

export default function ProfilePage() {
  return (
    <div className="flex max-w-xl flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Meu perfil</h1>
        <ProfileForm />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Trocar senha</h2>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
