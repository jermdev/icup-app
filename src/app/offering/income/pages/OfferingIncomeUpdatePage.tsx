import { offeringIncomeUpdateColumns } from '@/app/offering/income/components';
import { dataOfferingsIncome as data } from '@/app/offering/income/data';

import { DataTableSearchByTerm } from '@/shared/components';

export const OfferingIncomeUpdatePage = (): JSX.Element => {
  return (
    <div>
      <h1 className='text-center pt-1 pb-4 font-sans text-2xl sm:text-3xl font-bold text-offering-color text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Ofrendas
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <div className='flex items-center justify-start relative'>
        <h2 className='w-[19rem] sm:w-auto flex items-center text-left pl-4 py-2 sm:pt-4 sm:pb-2 sm:pl-[1.5rem] xl:pl-[2rem] 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-orange-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.98rem] xl:text-[2.1rem] 2xl:text-4xl'>
          Buscar registros de ingreso
        </h2>
        <span className='absolute left-28 sm:left-0 sm:relative sm:ml-3 bg-orange-300 text-slate-600 border text-center text-[10px] mt-[2.2rem] sm:mt-5 -py-1 px-2 rounded-full font-bold uppercase'>
          Actualizar
        </span>
      </div>
      <p className='dark:text-slate-300 text-left font-sans font-bold px-4 text-[12.5px] md:text-[15px] xl:text-base sm:px-[1.5rem] xl:px-[2rem]'>
        Elige tus opciones de búsqueda para actualizar registros de ingreso de ofrendas.
      </p>

      <div className='px-4 md:-px-2 md:px-[2rem] xl:px-[3rem] py-4 w-full'>
        <DataTableSearchByTerm columns={offeringIncomeUpdateColumns} data={data} />
      </div>
    </div>
  );
};
