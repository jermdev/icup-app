import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { MemberInfoItem } from './MemberInfoItem';

export function MembersInfoCard(): JSX.Element {
  return (
    <Card className='bg-slate-200 w-auto h-full row-start-3 row-end-4 col-start-1 col-end-2 md:row-start-3 md:row-end-4 md:col-start-1 md:col-end-3 xl:col-start-1 xl:col-end-4 xl:row-start-2 xl:row-end-3 md:h-[38rem] lg:h-[38rem] xl:h-auto 2xl:h-[38rem] lg:-mt-[39rem] xl-lv1:-mt-[5.5rem] xl:-mt-[10.5rem] 2xl:-mt-16'>
      <CardHeader className='xl:p-3 2xl:p-5'>
        <CardTitle className='font-bold text-xl sm:text-[1.45rem] lg:text-[1.50rem] 2xl:text-3xl'>
          Miembros Nuevos
        </CardTitle>
        <CardDescription className='pl-2 text-base text-slate-800'>
          Últimos miembros registrados.
        </CardDescription>
      </CardHeader>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
    </Card>
  );
}

// TODO : Hacer if y pasar la data como props del estado o request del backend
