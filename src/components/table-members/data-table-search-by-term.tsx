/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  type ColumnDef,
  flexRender,
  type SortingState,
  getPaginationRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  type VisibilityState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/components/ui/select';
import { formSearchByTermSchema } from '@/validations/form-search-by-term-schema';

import {
  MemberTypeSearch,
  MemberTypeSearchNames,
} from '@/enums/search-types.enum';
import { SubTypeMembersSearchNames } from '@/enums/search-sub-types.enum';

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
}

export function DataTableSearchByTerm<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const [disabled, setDisabled] = useState(true);

  const currentPath = window.location.pathname;

  const form = useForm<z.infer<typeof formSearchByTermSchema>>({
    resolver: zodResolver(formSearchByTermSchema),
    defaultValues: {
      limit: '10',
      offset: '0',
      term: '',
      termNames: '',
      termLastNames: '',
    },
  });

  let disabledTypes: string[];
  let disabledSubTypes: string[];

  // NOTE :hacer funcion que reciba como parametro el cirrenpath y devolver los disabled
  // NOTE:  usar enum Names
  // TODO : hacer el page de by term a los demas modulos y probar

  if (currentPath === '/disciples/search-by-term-disciples') {
    disabledTypes = [
      'Ofrenda Culto Dominical',
      'Ofrenda Casa Familiar',
      'Ofrenda Ayuno General',
      'Ofrenda Vigilia General',
      'Ofrenda Ayuno Zonal',
      'Ofrenda Vigilia Zonal',
      'Ofrenda Escuela Dominical',
      'Ofrenda Culto Jóvenes',
      'Ofrenda Actividades',
      'Ofrenda Terreno Iglesia',
      'Ofrenda Especial',
      'Diezmo',
    ];

    disabledSubTypes = [
      'Buscar pastores por sus propios nombres',
      'Buscar co-pastores por nombres de su pastor',
      'Buscar co-pastores por sus propios nombres ',
      'Buscar lideres por nombres de su pastor',
      'Buscar lideres por nombres de su co-pastor',
      'Buscar lideres por nombres de su supervisor',
      'Buscar lideres por sus propios nombres',
      'Buscar casas por nombres de su pastor',
      'Buscar casas por nombres de su co-pastor',
      'Buscar casas por nombres de su supervisor',
      'Buscar casas por nombres de su predicador',
      'Buscar casas por su propio nombre',
      'Buscar ofrendas por nombres de su co-pastor',
      'Buscar ofrendas por nombres de su predicador',
      'Buscar ofrendas por nombres de miembro',
      'Buscar ofrendas por rango de fecha',
    ];
  } else if (currentPath === '/pastors/search-by-term-pastors') {
    disabledTypes = [
      'Ofrenda Culto Dominical',
      'Ofrenda Casa Familiar',
      'Ofrenda Ayuno General',
      'Ofrenda Vigilia General',
      'Ofrenda Ayuno Zonal',
      'Ofrenda Vigilia Zonal',
      'Ofrenda Escuela Dominical',
      'Ofrenda Culto Jóvenes',
      'Ofrenda Actividades',
      'Ofrenda Terreno Iglesia',
      'Ofrenda Especial',
      'Diezmo',
      'Zona',
      'Código de casa familiar',
      'Nombre de casa familiar',
      'Roles',
    ];

    disabledSubTypes = [
      'Buscar miembros por nombres de su pastor',
      'Buscar miembros por nombres de su co-pastor',
      'Buscar miembros por nombres de su supervisor',
      'Buscar miembros por nombres de su predicador',
      'Buscar miembros por sus propios nombres',
      'Buscar co-pastores por nombres de su pastor',
      'Buscar co-pastores por sus propios nombres ',
      'Buscar lideres por nombres de su pastor',
      'Buscar lideres por nombres de su co-pastor',
      'Buscar lideres por nombres de su supervisor',
      'Buscar lideres por sus propios nombres',
      'Buscar casas por nombres de su pastor',
      'Buscar casas por nombres de su co-pastor',
      'Buscar casas por nombres de su supervisor',
      'Buscar casas por nombres de su predicador',
      'Buscar casas por su propio nombre',
      'Buscar ofrendas por nombres de su co-pastor',
      'Buscar ofrendas por nombres de su predicador',
      'Buscar ofrendas por nombres de miembro',
      'Buscar ofrendas por rango de fecha',
    ];
  } else if (currentPath === '/copastors/search-by-term-copastors') {
    disabledTypes = [
      'Ofrenda Culto Dominical',
      'Ofrenda Casa Familiar',
      'Ofrenda Ayuno General',
      'Ofrenda Vigilia General',
      'Ofrenda Ayuno Zonal',
      'Ofrenda Vigilia Zonal',
      'Ofrenda Escuela Dominical',
      'Ofrenda Culto Jóvenes',
      'Ofrenda Actividades',
      'Ofrenda Terreno Iglesia',
      'Ofrenda Especial',
      'Diezmo',
      'Zona',
      'Código de casa familiar',
      'Nombre de casa familiar',
      'Roles',
    ];

    disabledSubTypes = [
      'Buscar miembros por nombres de su pastor',
      'Buscar miembros por nombres de su co-pastor',
      'Buscar miembros por nombres de su supervisor',
      'Buscar miembros por nombres de su predicador',
      'Buscar miembros por sus propios nombres',
      'Buscar pastores por sus propios nombres',
      'Buscar lideres por nombres de su pastor',
      'Buscar lideres por nombres de su co-pastor',
      'Buscar lideres por nombres de su supervisor',
      'Buscar lideres por sus propios nombres',
      'Buscar casas por nombres de su pastor',
      'Buscar casas por nombres de su co-pastor',
      'Buscar casas por nombres de su supervisor',
      'Buscar casas por nombres de su predicador',
      'Buscar casas por su propio nombre',
      'Buscar ofrendas por nombres de su co-pastor',
      'Buscar ofrendas por nombres de su predicador',
      'Buscar ofrendas por nombres de miembro',
      'Buscar ofrendas por rango de fecha',
    ];
  } else if (currentPath === '/leaders/search-by-term-leaders') {
    disabledTypes = [
      'Ofrenda Culto Dominical',
      'Ofrenda Casa Familiar',
      'Ofrenda Ayuno General',
      'Ofrenda Vigilia General',
      'Ofrenda Ayuno Zonal',
      'Ofrenda Vigilia Zonal',
      'Ofrenda Escuela Dominical',
      'Ofrenda Culto Jóvenes',
      'Ofrenda Actividades',
      'Ofrenda Terreno Iglesia',
      'Ofrenda Especial',
      'Diezmo',
      'Roles',
    ];

    disabledSubTypes = [
      'Buscar miembros por nombres de su pastor',
      'Buscar miembros por nombres de su co-pastor',
      'Buscar miembros por nombres de su supervisor',
      'Buscar miembros por nombres de su predicador',
      'Buscar miembros por sus propios nombres',
      'Buscar pastores por sus propios nombres',
      'Buscar co-pastores por nombres de su pastor',
      'Buscar co-pastores por sus propios nombres ',
      'Buscar casas por nombres de su pastor',
      'Buscar casas por nombres de su co-pastor',
      'Buscar casas por nombres de su supervisor',
      'Buscar casas por nombres de su predicador',
      'Buscar casas por su propio nombre',
      'Buscar ofrendas por nombres de su co-pastor',
      'Buscar ofrendas por nombres de su predicador',
      'Buscar ofrendas por nombres de miembro',
      'Buscar ofrendas por rango de fecha',
    ];
  } else if (currentPath === '/family-houses/search-by-term-family-houses') {
    disabledTypes = [
      'Ofrenda Culto Dominical',
      'Ofrenda Casa Familiar',
      'Ofrenda Ayuno General',
      'Ofrenda Vigilia General',
      'Ofrenda Ayuno Zonal',
      'Ofrenda Vigilia Zonal',
      'Ofrenda Escuela Dominical',
      'Ofrenda Culto Jóvenes',
      'Ofrenda Actividades',
      'Ofrenda Terreno Iglesia',
      'Ofrenda Especial',
      'Diezmo',
      'Roles',
      'Nombres',
      'Apellidos',
      'Nombres y Apellidos',
      'Mes de nacimiento',
      'Genero',
      'Estado civil',
      'País de origen',
    ];

    disabledSubTypes = [
      'Buscar miembros por nombres de su pastor',
      'Buscar miembros por nombres de su co-pastor',
      'Buscar miembros por nombres de su supervisor',
      'Buscar miembros por nombres de su predicador',
      'Buscar miembros por sus propios nombres',
      'Buscar pastores por sus propios nombres',
      'Buscar co-pastores por nombres de su pastor',
      'Buscar co-pastores por sus propios nombres ',
      'Buscar lideres por nombres de su pastor',
      'Buscar lideres por nombres de su co-pastor',
      'Buscar lideres por nombres de su supervisor',
      'Buscar lideres por sus propios nombres',
      'Buscar ofrendas por nombres de su co-pastor',
      'Buscar ofrendas por nombres de su predicador',
      'Buscar ofrendas por nombres de miembro',
      'Buscar ofrendas por rango de fecha',
    ];
  } else if (currentPath === '/offerings/search-by-term-offerings') {
    disabledTypes = [
      'Roles',
      'Mes de nacimiento',
      'Genero',
      'Estado civil',
      'País de origen',
      'Departamento',
      'Provincia',
      'Distrito',
    ];

    disabledSubTypes = [
      'Buscar miembros por nombres de su pastor',
      'Buscar miembros por nombres de su co-pastor',
      'Buscar miembros por nombres de su supervisor',
      'Buscar miembros por nombres de su predicador',
      'Buscar miembros por sus propios nombres',
      'Buscar pastores por sus propios nombres',
      'Buscar co-pastores por nombres de su pastor',
      'Buscar co-pastores por sus propios nombres ',
      'Buscar lideres por nombres de su pastor',
      'Buscar lideres por nombres de su co-pastor',
      'Buscar lideres por nombres de su supervisor',
      'Buscar lideres por sus propios nombres',
      'Buscar casas por nombres de su pastor',
      'Buscar casas por nombres de su co-pastor',
      'Buscar casas por nombres de su supervisor',
      'Buscar casas por nombres de su predicador',
      'Buscar casas por su propio nombre',
    ];
  } else if (currentPath === '/users/search-by-term-users') {
    disabledTypes = [
      'Ofrenda Culto Dominical',
      'Ofrenda Casa Familiar',
      'Ofrenda Ayuno General',
      'Ofrenda Vigilia General',
      'Ofrenda Ayuno Zonal',
      'Ofrenda Vigilia Zonal',
      'Ofrenda Escuela Dominical',
      'Ofrenda Culto Jóvenes',
      'Ofrenda Actividades',
      'Ofrenda Terreno Iglesia',
      'Ofrenda Especial',
      'Diezmo',
      'Mes de nacimiento',
      'Genero',
      'Estado civil',
      'Zona',
      'Código de casa familiar',
      'Nombre de casa familiar',
      'Dirección',
      'País de origen',
      'Departamento',
      'Provincia',
      'Distrito',
    ];

    disabledSubTypes = [
      'Buscar miembros por nombres de su pastor',
      'Buscar miembros por nombres de su co-pastor',
      'Buscar miembros por nombres de su supervisor',
      'Buscar miembros por nombres de su predicador',
      'Buscar miembros por sus propios nombres',
      'Buscar pastores por sus propios nombres',
      'Buscar co-pastores por nombres de su pastor',
      'Buscar co-pastores por sus propios nombres ',
      'Buscar lideres por nombres de su pastor',
      'Buscar lideres por nombres de su co-pastor',
      'Buscar lideres por nombres de su supervisor',
      'Buscar lideres por sus propios nombres',
      'Buscar casas por nombres de su pastor',
      'Buscar casas por nombres de su co-pastor',
      'Buscar casas por nombres de su supervisor',
      'Buscar casas por nombres de su predicador',
      'Buscar casas por su propio nombre',
      'Buscar ofrendas por nombres de su co-pastor',
      'Buscar ofrendas por nombres de su predicador',
      'Buscar ofrendas por nombres de miembro',
      'Buscar ofrendas por rango de fecha',
    ];
  }

  // TODO : agregar select en marital status term, y hacer gris de 4 para xl y lg

  const type = form.watch('type');

  function onSubmit(values: z.infer<typeof formSearchByTermSchema>): void {
    setDisabled(false);
    form.reset();
    console.log({ values });
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='md:w-full m-auto lg:w-full pt-4'>
      {/* Convertir este form en un componente para reutilizar */}
      {/* puedo utilizar el mismo esquema pero lo puedo deshabilitar ciertos tipos y sub tipos */}
      {/*  Entonces debo agregar todos los tipos y subtipos disponibles y luego hacer el filter para deshabilitar */}

      {disabled && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-2 gap-4 gap-y-2 items-end mb-14 md:mb-10 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4'
          >
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => {
                return (
                  <FormItem className=''>
                    <FormLabel className='text-[13px] md:text-sm'>
                      Tipo
                    </FormLabel>
                    <FormDescription className='text-[12px] md:text-[13px]'>
                      ¿Que tipo de búsqueda desea hacer?
                    </FormDescription>
                    <Select onValueChange={field.onChange}>
                      <FormControl className='text-[12px] md:text-[13px]'>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona un tipo' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(MemberTypeSearchNames).map(
                          ([key, value]) => (
                            <SelectItem
                              className={`text-[12px] md:text-[13px] ${disabledTypes.includes(value) ? 'hidden' : ''}`}
                              key={key}
                              value={key}
                            >
                              {value}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {(type === MemberTypeSearch.firstName ||
              type === MemberTypeSearch.lastName ||
              type === MemberTypeSearch.fullName) && (
              <FormField
                control={form.control}
                name='subType'
                render={({ field }) => {
                  return (
                    <FormItem className=''>
                      <FormLabel className='text-[13px] md:text-sm'>
                        Sub-tipo
                      </FormLabel>
                      <FormDescription className='text-[12px] md:text-[13px]'>
                        ¿Que sub tipo de búsqueda deseas hacer?
                      </FormDescription>
                      <Select onValueChange={field.onChange}>
                        <FormControl className='text-[12px] md:text-[13px]'>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecciona una sub-tipo' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(SubTypeMembersSearchNames).map(
                            ([key, value]) => (
                              <SelectItem
                                className={`text-[12px] md:text-[13px] ${disabledSubTypes.includes(value) ? 'hidden' : ''}`}
                                key={key}
                                value={key}
                              >
                                {value}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}

            {type !== MemberTypeSearch.firstName &&
              type !== MemberTypeSearch.lastName &&
              type !== MemberTypeSearch.fullName &&
              type !== undefined && (
                <FormField
                  control={form.control}
                  name='term'
                  render={({ field }) => (
                    <FormItem className=''>
                      <FormLabel className='text-[13px] md:text-sm'>
                        Termino
                      </FormLabel>
                      <FormDescription className='text-[12px] md:text-[13px]'>
                        Escribe aquí lo que deseas buscar.
                      </FormDescription>
                      <FormControl>
                        <Input
                          className='text-[12px] md:text-[13px]'
                          placeholder='Escribe el termino de búsqueda'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

            {(type === MemberTypeSearch.firstName ||
              type === MemberTypeSearch.fullName) && (
              <FormField
                control={form.control}
                name='termNames'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[13px] md:text-sm'>
                      Termino (nombres)
                    </FormLabel>
                    <FormDescription className='text-[12px] md:text-[13px]'>
                      Escribe aquí los nombres que deseas buscar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className='text-[12px] md:text-[13px]'
                        placeholder='Escribe el termino de búsqueda'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {(type === MemberTypeSearch.lastName ||
              type === MemberTypeSearch.fullName) && (
              <FormField
                control={form.control}
                name='termLastNames'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[13px] md:text-sm'>
                      Termino (apellidos)
                    </FormLabel>
                    <FormDescription className='text-[12px] md:text-[13px]'>
                      Escribe aquí los apellidos que deseas buscar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className='text-[12px] md:text-[13px]'
                        placeholder='Escribe el termino de búsqueda'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name='limit'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel className='text-[13px] md:text-sm'>
                    Limite
                  </FormLabel>
                  <FormDescription className='text-[12px] md:text-[13px]'>
                    ¿Cuantos registros necesitas?
                  </FormDescription>
                  <FormControl>
                    <Input
                      className='text-[12px] md:text-[13px]'
                      placeholder='Limite de registros'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='offset'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel className='text-[13px] md:text-[13px]'>
                    Desplazamiento
                  </FormLabel>
                  <FormDescription className='text-[12px] md:text-[13px]'>
                    ¿Cuantos registros quieres saltar?
                  </FormDescription>
                  <FormControl>
                    <Input
                      className='text-[12px] md:text-[13px]'
                      placeholder='Nro. de registros desplazados'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='order'
              render={({ field }) => (
                <FormItem className='col-start-1 col-end-3 lg:col-start-auto lg:col-end-auto'>
                  <FormLabel className='text-[13px] md:text-sm'>
                    Orden
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl className='text-[12px] md:text-[13px] '>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona un tipo de orden' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        className='text-[12px] md:text-[13px]'
                        value='ASC'
                      >
                        Mas antiguo a mas nuevo
                      </SelectItem>
                      <SelectItem
                        className='text-[12px] md:text-[13px]'
                        value='DESC'
                      >
                        Mas nuevo a mas antiguo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              variant='ghost'
              className='mx-auto col-start-1 col-end-3 row-start-6 lg:col-start-2 lg:col-end-3 lg:row-start-4 lg:row-end-5 xl:row-start-3 xl:row-end-4 xl:col-start-2 xl:col-end-4 w-[8rem] text-[13px] lg:text-[14px] h-[2.5rem] md:w-[8rem] lg:w-[12rem] xl:w-[12rem] xl:mx-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500  hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
            >
              Buscar
            </Button>
          </form>
        </Form>
      )}

      {!disabled &&
        (currentPath === '/disciples/search-by-term-disciples' ||
          currentPath === '/pastors/search-pastors' ||
          currentPath === '/copastors/search-copastors' ||
          currentPath === '/leaders/search-leaders') && (
          <div className='pb-8 lg:pb-8 grid grid-cols-1 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
            <Button
              variant='ghost'
              className='w-[8rem] m-auto text-[13px] lg:text-[14px] h-full md:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
              onClick={() => {
                setDisabled(true);
                table.getColumn('first_name')?.setFilterValue('');
                table.getColumn('last_name')?.setFilterValue('');
              }}
            >
              Nueva Búsqueda
            </Button>
            <Input
              placeholder='Filtro por nombres...'
              value={
                (table.getColumn('first_name')?.getFilterValue() as string) ??
                ''
              }
              onChange={(event) =>
                table
                  .getColumn('first_name')
                  ?.setFilterValue(event.target.value)
              }
              className='text-[13px] lg:text-[14px]  w-full'
              disabled={disabled}
            />
            <Input
              placeholder='Filtro por apellidos...'
              value={
                (table.getColumn('last_name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('last_name')?.setFilterValue(event.target.value)
              }
              className='col-start-1 col-end-2 text-[13px] lg:text-[14px] w-full'
              disabled={disabled}
            />
            <Button
              variant='ghost'
              className='w-[6rem] m-auto text-[13px] lg:text-[14px] h-full md:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:text-red-950'
              onClick={() => {
                table.getColumn('first_name')?.setFilterValue('');
                table.getColumn('last_name')?.setFilterValue('');
              }}
            >
              Borrar
            </Button>
          </div>
        )}

      {!disabled && currentPath === '/family-houses/search-family-houses' && (
        <div className='pb-8 lg:pb-8 grid grid-cols-1 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
          <Button
            variant='ghost'
            className='w-[8rem] m-auto text-[13px] lg:text-[14px] h-full md:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
            onClick={() => {
              setDisabled(true);
              table.getColumn('name_house')?.setFilterValue('');
              table.getColumn('code')?.setFilterValue('');
            }}
          >
            Nueva Búsqueda
          </Button>
          <Input
            placeholder='Filtro por nombre de casa...'
            value={
              (table.getColumn('name_house')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('name_house')?.setFilterValue(event.target.value)
            }
            className='text-[13px] lg:text-[14px]  w-full'
            disabled={disabled}
          />
          <Input
            placeholder='Filtro por código de casa...'
            value={(table.getColumn('code')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('code')?.setFilterValue(event.target.value)
            }
            className='col-start-1 col-end-2 text-[13px] lg:text-[14px] w-full'
            disabled={disabled}
          />
          <Button
            variant='ghost'
            className='w-[6rem] m-auto text-[13px] lg:text-[14px] h-full md:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:text-red-950'
            onClick={() => {
              table.getColumn('name_house')?.setFilterValue('');
              table.getColumn('code')?.setFilterValue('');
            }}
          >
            Borrar
          </Button>
        </div>
      )}

      {!disabled && currentPath === '/offerings/search-offerings' && (
        <div className='pb-8 lg:pb-8 grid grid-cols-1 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
          <Button
            variant='ghost'
            className='w-[8rem] m-auto text-[13px] lg:text-[14px] h-full md:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
            onClick={() => {
              setDisabled(true);
              table.getColumn('type')?.setFilterValue('');
              table.getColumn('sub_type')?.setFilterValue('');
            }}
          >
            Nueva Búsqueda
          </Button>
          <Input
            placeholder='Filtro por tipo de ofrenda...'
            value={(table.getColumn('type')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('type')?.setFilterValue(event.target.value)
            }
            className='text-[13px] lg:text-[14px] w-full'
            disabled={disabled}
          />
          <Input
            placeholder='Filtro por código de casa...'
            value={
              (table.getColumn('sub_type')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('sub_type')?.setFilterValue(event.target.value)
            }
            className='col-start-1 col-end-2 text-[13px] lg:text-[14px] w-full'
            disabled={disabled}
          />
          <Button
            variant='ghost'
            className='w-[6rem] m-auto text-[13px] lg:text-[14px] h-full md:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:text-red-950'
            onClick={() => {
              table.getColumn('type')?.setFilterValue('');
              table.getColumn('sub_type')?.setFilterValue('');
            }}
          >
            Borrar
          </Button>
        </div>
      )}

      {!disabled && currentPath === '/users/search-users' && (
        <div className='pb-8 lg:pb-8 grid grid-cols-1 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
          <Button
            variant='ghost'
            className='w-[8rem] m-auto text-[13px] lg:text-[14px] h-full md:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
            onClick={() => {
              setDisabled(true);
              table.getColumn('email')?.setFilterValue('');
              table.getColumn('roles')?.setFilterValue('');
            }}
          >
            Nueva Búsqueda
          </Button>
          <Input
            placeholder='Filtro por correo electrónico...'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className='text-[13px] lg:text-[14px] w-full'
            disabled={disabled}
          />
          <Input
            placeholder='Filtro por roles de usuario...'
            value={(table.getColumn('roles')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('roles')?.setFilterValue(event.target.value)
            }
            className='col-start-1 col-end-2 text-[13px] lg:text-[14px] w-full'
            disabled={disabled}
          />
          <Button
            variant='ghost'
            className='w-[6rem] m-auto text-[13px] lg:text-[14px] h-full md:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:text-red-950'
            onClick={() => {
              table.getColumn('email')?.setFilterValue('');
              table.getColumn('roles')?.setFilterValue('');
            }}
          >
            Borrar
          </Button>
        </div>
      )}

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className='text-center text-slate-700 dark:text-slate-200 font-bold text-[13px] lg:text-sm'
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {!disabled && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className='text-center font-normal text-[12px] lg:text-sm'
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className='px-2 lg:px-4 py-2.5' key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          className='text-[13px] lg:text-sm'
          variant='outline'
          size='sm'
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          className='text-[13px] lg:text-sm'
          variant='outline'
          size='sm'
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}