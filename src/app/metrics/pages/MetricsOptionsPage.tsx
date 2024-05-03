import { NavLink } from 'react-router-dom';

import { FcDonate, FcHome, FcManager } from 'react-icons/fc';

import { WhiteCard } from '@/shared/components';

export const MetricsOptionsPage = (): JSX.Element => {
  return (
    <>
      <h1 className='text-center pb-2 pt-3 md:pt-2 md:pb-2 font-sans text-2xl sm:text-3xl font-bold text-emerald-500 text-[2rem] sm:text-[2.4rem] md:text-[2.6rem] lg:text-5xl xl:text-5xl'>
        Modulo Métricas
      </h1>
      <p className='text-center font-sans text-[15px] sm:text-md md:text-[15px] font-bold px-4 pb-4 lg:text-base xl:text-lg'>
        Bienvenido, por favor elige una opción.
      </p>
      <hr className='p-[0.015rem] bg-slate-500' />

      <div className='w-full px-[2rem] py-6 sm:px-[7rem] md:px-[4rem] lg:px-[3rem] xl:px-[3rem] 2xl:px-16 grid gap-8 lg:gap-5 2xl:gap-8 lg:h-[43rem] 2xl:h-[43rem]'>
        <NavLink
          key='/metrics/metrics-member'
          to='/metrics/metrics-member'
          end
          className='row-start-1 row-end-2 lg:row-start-1 lg:row-end-4 lg:col-start-1 lg:col-end- 2xl:row-start-1 2xl:row-end-7 2xl:col-start-1 2xl:col-end-2'
        >
          <WhiteCard className='md:h-[11rem]' centered>
            <FcManager className='text-[10rem] lg:text-[8rem] xl:text-[7rem]' />
            <h2 className='text-sky-500 font-bold text-[22px] sm:text-2xl lg:text-3xl xl:text-4xl'>
              Métricas de Miembro
            </h2>
            <p className='font-bold text-[14px] lg:text-[15px] xl:text-[16px]'>
              Visualización de datos estadísticos y métricas de miembros.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/metrics/metrics-family-house'
          to='/metrics/metrics-family-house'
          end
          className='row-start-2 row-end-3 lg:row-start-4 lg:row-end-7 lg:col-start-1 lg:col-end-2 2xl:row-start-1 2xl:row-end-7 2xl:col-start-2 2xl:col-end-3'
        >
          <WhiteCard className='md:h-[11rem]' centered>
            <FcHome className='text-[10rem] lg:text-[7rem] xl:text-[8rem]' />
            <h2 className='text-orange-500 font-bold text-[22px] sm:text-2xl lg:text-3xl xl:text-4xl'>
              Métricas de Casa Familiar
            </h2>
            <p className='font-bold text-[14px] lg:text-[15px] xl:text-[16px]'>
              Visualización de datos estadísticos y métricas de casas familiares.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/metrics/metrics-offering'
          to='/metrics/metrics-offering'
          end
          className='row-start-3 row-end-4 lg:row-start-1 lg:row-end-7 lg:col-start-2 lg:col-end-3 2xl:row-start-1 2xl:row-end-7 2xl:col-start-3 2xl:col-end-4'
        >
          <WhiteCard className='md:h-[11rem]' centered>
            <FcDonate className='text-[10rem] lg:text-[6rem] xl:text-[6rem]' />
            <h2 className='text-yellow-500 font-bold text-[22px] sm:text-2xl lg:text-3xl xl:text-4xl'>
              Métricas de Ofrenda
            </h2>
            <p className='font-bold text-[14px] lg:text-[15px] xl:text-[16px]'>
              Visualización de datos estadísticos y métricas de ofrendas.
            </p>
          </WhiteCard>
        </NavLink>
      </div>
    </>
  );
};