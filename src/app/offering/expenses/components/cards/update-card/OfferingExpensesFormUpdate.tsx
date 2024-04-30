/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect, useCallback } from 'react';

import { type z } from 'zod';
import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { CalendarIcon } from '@radix-ui/react-icons';
import { TiDeleteOutline } from 'react-icons/ti';

import { cn } from '@/shared/lib/utils';

import { useOfferingExpensesSubmitButtonLogic } from '@/app/offering/expenses/hooks';
import { offeringExpensesFormSchema } from '@/app/offering/expenses/validations';

import {
  SubTypesOfferingExpenses,
  SubTypesOfferingExpensesNames,
  TypesOfferingExpenses,
  TypesOfferingExpensesNames,
} from '@/app/offering/expenses/enums';

import {
  type OfferingExpensesData,
  type OfferingExpensesDataKeys,
} from '@/app/offering/expenses/interfaces';

import { CurrencyType, CurrencyTypeNames } from '@/app/offering/shared/enums';
import { type RejectedProps, type FilesProps } from '@/app/offering/shared/interfaces';

import { Status } from '@/shared/enums';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Calendar } from '@/shared/components/ui/calendar';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/shared/components/ui/select';

const data: OfferingExpensesData = {
  type: TypesOfferingExpenses.EquipmentAndTechnologyExpenses,
  subType: SubTypesOfferingExpenses.ComputerEquipment,
  amount: '20',
  date: new Date('12-12-2000'),
  currency: CurrencyType.Dollars,
  comments: 'Diezmo entregado 2 días después 12/03/24',
  urlFile: [], // pasar el link del get de la imagen de cloudinary
  // familyHouseID: familyHouses[1].value,
  // copastorID: copastors[2].value,
  // memberID: 'id2',
  status: Status.Active,
};

interface Props {
  onClose: () => void;
  onScroll: () => void;
}

export const OfferingExpensesFormUpdate = ({ onClose, onScroll }: Props): JSX.Element => {
  //* States
  const [isInputDateOpen, setIsInputDateOpen] = useState<boolean>(false);

  const [files, setFiles] = useState<FilesProps[]>([]);
  const [rejected, setRejected] = useState<RejectedProps[]>([]);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [isDropZoneDisabled, setIsDropZoneDisabled] = useState<boolean>(false);
  const [isFileButtonDisabled, setIsFileButtonDisabled] = useState<boolean>(false);

  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);

  //* Form
  const form = useForm<z.infer<typeof offeringExpensesFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(offeringExpensesFormSchema),
    defaultValues: {
      type: '',
      subType: '',
      amount: '',
      date: undefined,
      currency: '',
      comments: '',
      urlFile: [],
      status: '',
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof offeringExpensesFormSchema>): void => {
    console.log({ values });
  };

  //* Watchers
  const type = form.watch('type');
  // const subType = form.watch('subType');
  const status = form.watch('status');
  const urlFiles = form.watch('urlFile');

  //* DropZone functions, hooks, effects
  const onDrop = useCallback(
    (acceptedFiles: any[], rejectedFiles: any[]) => {
      if (acceptedFiles?.length) {
        const mappedFiles = acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );

        // Verifica si ya existe un archivo con el mismo nombre
        mappedFiles.forEach((newFile) => {
          const existingFileIndex = files.findIndex(
            (existingFile) => existingFile.name === newFile.name
          );

          if (existingFileIndex !== -1) {
            setFiles((previousFiles) => [...previousFiles]);
          } else {
            setFiles((previousFiles) => [...previousFiles, newFile]);
          }
        });

        const allFileNames = [
          ...files.map((file) => file.name),
          ...mappedFiles.map((file) => file.name),
        ];

        form.setValue('urlFile', allFileNames); // Actualiza el campo de formulario con las URLs de los archivos
      }

      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    [form, files, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxSize: 1024 * 1000,
    onDrop,
    disabled: isDropZoneDisabled,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  useEffect(() => {
    const allFileNames = [...files.map((file) => file.name)];
    form.setValue('urlFile', allFileNames);
  }, [files]);

  const removeFile = (name: any): void => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = (): void => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: any): void => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  useEffect(() => {
    if (status === Status.Inactive) {
      setIsDropZoneDisabled(true);
      setIsFileButtonDisabled(true);
    }

    if (status === Status.Active) {
      setIsDropZoneDisabled(false);
      setIsFileButtonDisabled(false);
    }
  }, [status]);

  //* Custom hooks
  // NOTE : hacer custom hooks para setear
  useEffect(() => {
    for (const key in data) {
      form.setValue(key as OfferingExpensesDataKeys, data[key as OfferingExpensesDataKeys]);
    }
  }, []);

  useOfferingExpensesSubmitButtonLogic({
    formOfferingExpenses: form,
    typesOfferingExpenses: TypesOfferingExpenses,
    isInputDisabled,
    isDropZoneDisabled,
    isFileButtonDisabled,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    setIsDropZoneDisabled,
  });

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[990px] xl:w-[1100px]'
    >
      <div className='text-center'>
        <h2 className='text-orange-500  font-bold text-[20px] md:text-[24px]'>
          Actualizar información del registro
        </h2>
      </div>

      <TabsContent value='general-info'>
        <Card className='w-full'>
          <CardContent className='py-3 px-4'>
            <div className='flex flex-col mb-4 pl-4'>
              <div className='dark:text-slate-300 text-slate-500 font-bold text-[17px]'>
                Registro de salida: 12KH453 - Marcelo Pacheco
              </div>

              {status === Status.Active ? (
                <span className='text-[11.5px] md:text-[12px] font-medium dark:text-slate-400 text-slate-500 md:pl-2'>
                  El estado del registro esta{' '}
                  <span className='font-bold text-green-500 uppercase'>Activo</span>, solo se podrá
                  añadir o actualizar sus imágenes.
                </span>
              ) : (
                <span className='text-[11.5px] md:text-[12px] font-medium dark:text-slate-400 text-slate-500 md:pl-2'>
                  El estado del registro esta{' '}
                  <span className='font-bold text-red-500 uppercase'>Inactivo</span>, no se podrá
                  actualizar ningún campo.
                </span>
              )}
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-full flex flex-col md:grid sm:grid-cols-2 gap-x-8 gap-y-6 px-2 sm:px-8'
              >
                <div className='lg:col-start-1 lg:col-end-2'>
                  <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                            Tipo
                          </FormLabel>
                          <FormDescription className='text-[14px]'>
                            Selecciona un tipo de gasto para el registro.
                          </FormDescription>
                          <Select
                            disabled={isInputDisabled}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                {field.value ? (
                                  <SelectValue placeholder='Selecciona una tipo de egreso o gasto' />
                                ) : (
                                  'Selecciona una tipo de egreso o gasto'
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(TypesOfferingExpensesNames).map(([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {type !== '' && (
                    <FormField
                      control={form.control}
                      name='subType'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Sub-Tipo
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar un sub-tipo de gasto al registro.
                            </FormDescription>
                            <Select
                              disabled={isInputDisabled}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  {field.value ? (
                                    <SelectValue placeholder='Selecciona una sub-tipo de gasto' />
                                  ) : (
                                    'Selecciona una sub-tipo de gasto'
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(SubTypesOfferingExpensesNames).map(
                                  ([key, value]) => (
                                    <SelectItem key={key} value={key}>
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

                  <FormField
                    control={form.control}
                    name='amount'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-3'>
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                            Monto
                          </FormLabel>
                          <FormDescription className='text-[14px]'>
                            Digita la cantidad del gasto realizado.
                          </FormDescription>
                          <FormControl>
                            <Input
                              disabled={isInputDisabled}
                              placeholder='Monto total del gasto realizado'
                              type='text'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name='currency'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-3'>
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                            Divisa / Moneda
                          </FormLabel>
                          <FormDescription className='text-[14px]'>
                            Asignar un tipo de divisa o moneda al registro.
                          </FormDescription>
                          <Select
                            disabled={isInputDisabled}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    field.value === CurrencyType.Dollars
                                      ? CurrencyTypeNames.dollars
                                      : field.value === CurrencyType.Soles
                                        ? CurrencyTypeNames.soles
                                        : CurrencyTypeNames.euros
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(CurrencyTypeNames).map(([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name='date'
                    render={({ field }) => (
                      <FormItem className='flex flex-col mt-3'>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Fecha
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Elige la fecha de gasto o compra realizada.
                        </FormDescription>
                        <Popover open={isInputDateOpen} onOpenChange={setIsInputDateOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isInputDisabled}
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'LLL dd, y', { locale: es })
                                ) : (
                                  <span className='text-sm md:text-[12px] lg:text-sm'>
                                    Seleccione la fecha del gasto o compra
                                  </span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setIsInputDateOpen(false);
                              }}
                              disabled={(date) =>
                                date > new Date() || date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='comments'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-3'>
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold flex items-center'>
                            Comentarios
                            <span className='ml-3 inline-block bg-gray-200 text-slate-600 border text-[10px] font-semibold uppercase px-2 py-[2px] rounded-full mr-1'>
                              Opcional
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              disabled={isInputDisabled}
                              placeholder='Comentarios referente al registro de la salida'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-3'>
                          <FormLabel className='text-[14px]'>Estado</FormLabel>
                          <Select disabled={isInputDisabled} onValueChange={field.onChange}>
                            <FormControl className='text-[13px] md:text-[14px]'>
                              <SelectTrigger>
                                {field.value === 'active' ? (
                                  <SelectValue placeholder='Activo' />
                                ) : (
                                  <SelectValue placeholder='Inactivo' />
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem className='text-[13px] md:text-[14px]' value='active'>
                                Activo
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {form.getValues('status') === 'active' && (
                            <FormDescription className='pl-2 text-[12px] md:text-[12.5px] font-bold'>
                              *El registro esta <span className='text-green-500'>Activo</span>, para
                              colocarlo como <span className='text-red-500'>Inactivo</span> eliminar
                              el registro desde la pestaña{' '}
                              <span className='font-bold text-red-500'>Eliminar Salida.</span>
                            </FormDescription>
                          )}
                          {form.getValues('status') === 'inactive' && (
                            <FormDescription className='pl-2 text-[12px] md:text-[12.5px] font-bold'>
                              * El registro esta <span className='text-red-500'>Inactivo</span>, y
                              su estado no se puede modificar.
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className='lg:col-start-2 lg:col-end-3 border-l-2 border-slate-200 dark:border-slate-800 pl-8'>
                  <FormField
                    control={form.control}
                    name='urlFile'
                    render={() => {
                      return (
                        <FormItem className='mt-4 md:mt-0'>
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold flex items-center'>
                            Subir imagen
                            <span className='ml-3 inline-block bg-gray-200 text-slate-600 border text-[10px] font-semibold uppercase px-2 py-[2px] rounded-full mr-1'>
                              Opcional
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div
                              {...getRootProps({
                                className:
                                  'font-medium text-sm sm:text-[15px] p-10 sm:p-12 md:p-16 max-w-[25rem] md:max-w-[25rem] m-auto border border-dashed border-black dark:border-white hover:bg-green-200 dark:hover:text-black ease-in duration-200 text-center',
                              })}
                            >
                              <input {...getInputProps()} className='m-auto w-[20rem]' />

                              {isDragActive ? (
                                <p>Suelte sus archivos aquí ...</p>
                              ) : (
                                <p>
                                  Arrastre y suelte sus archivos aquí, o haga clic para seleccionar.
                                </p>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                          {urlFiles && urlFiles.length > 3 ? (
                            <span className='text-red-500 font-bold text-[11.5px] md:text-[12.5px] text-center mx-auto justify-center flex'>
                              ❌ Sobrepasa el limite, elige como máximo solo 3 imágenes.
                            </span>
                          ) : (
                            <span className='font-bold text-[11.5px] md:text-[12.5px] pl-6 mt-1 flex flex-col'>
                              {' '}
                              <span>✅ Máximo 3 archivos.</span>
                              <span>
                                ✅ El campo se bloqueara al llegar o pasar los 3 archivos.
                              </span>
                            </span>
                          )}
                        </FormItem>
                      );
                    }}
                  />
                  <section className='mt-10'>
                    <div className='flex gap-4 items-center justify-between'>
                      <h2 className='text-[16px] md:text-[18px] font-bold'>Pre-visualización</h2>
                      <button
                        disabled={isFileButtonDisabled}
                        type='button'
                        onClick={removeAll}
                        className='mt-1 text-[10px] md:text-[11px] w-[8rem] md:w-[10rem] p-2 uppercase tracking-wider font-bold text-red-500 border border-red-400 rounded-md  hover:bg-secondary-400 hover:text-white ease-in duration-200 hover:bg-red-500 transition-colors'
                      >
                        Remover todos los archivos
                      </button>
                    </div>

                    {/* Accepted files */}
                    <h3 className='text-[14.5px] lg:text-[16px] font-semibold mt-5 border-b pb-3'>
                      Archivos Aceptados
                    </h3>
                    <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-x-5 gap-y-20'>
                      {files.map((file) => (
                        <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
                          <img
                            src={file.preview}
                            alt={file.name}
                            width={100}
                            height={100}
                            onLoad={() => {
                              URL.revokeObjectURL(file.preview);
                            }}
                            className='h-full w-full object-contain rounded-md'
                          />
                          <button
                            disabled={isFileButtonDisabled}
                            type='button'
                            className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                            onClick={() => {
                              removeFile(file.name);
                            }}
                          >
                            <TiDeleteOutline className='w-12 h-12 fill-red-500 hover:fill-secondary-400 transition-colors' />
                          </button>
                          <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                            {file.name}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {/* Rejected Files */}
                    <h3 className='text-[14.5px] lg:text-[16px] font-semibold mt-20 border-b pb-3'>
                      Archivos rechazados
                    </h3>
                    <ul className='mt-2 flex flex-col'>
                      {rejected.map(({ file, errors }) => (
                        <li key={file.name} className='flex items-start justify-between'>
                          <div>
                            <p className='mt-2 text-neutral-500 text-sm font-medium'>{file.name}</p>
                            <ul className='text-[14px] text-red-400 flex gap-3 font-medium'>
                              {errors.map((error) => (
                                <li key={error.code}>{error.message}</li>
                              ))}
                            </ul>
                          </div>
                          <button
                            disabled={isFileButtonDisabled}
                            type='button'
                            className='mt-1 py-1 text-[11px] md:text-[12px] uppercase tracking-wider font-bold text-red-500 border border-red-400 rounded-md px-3 hover:bg-red-500 hover:text-white ease-in duration-200 transition-colors'
                            onClick={() => {
                              removeRejected(file.name);
                            }}
                          >
                            remover
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {isMessageErrorDisabled ? (
                  <p className='-mb-6 mt-4 md:-mb-6 md:mt-0 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                    ❌ Datos incompletos, completa todos los campos para guardar el registro.
                  </p>
                ) : (
                  <p className='-mt-4 order-last md:-mt-3 md:row-start-3 md:row-end-4 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                    ¡Campos completados correctamente! <br /> Para finalizar por favor guarde los
                    cambios
                  </p>
                )}

                <div className='w-full md:w-[20rem] md:mx-auto col-start-1 col-end-3 text-sm md:text-md xl:text-base mt-2 md:mt-2'>
                  <Toaster position='top-center' richColors />
                  <Button
                    disabled={isSubmitButtonDisabled}
                    type='submit'
                    className='w-full text-[14px]'
                    onClick={() => {
                      // NOTE : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
                      // NOTE : hacer petición al backend para actualizar
                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          toast.success('Cambios guardados correctamente', {
                            position: 'top-center',
                            className: 'justify-center',
                          });
                          setIsInputDisabled(true);
                          setIsDropZoneDisabled(true);
                          setIsSubmitButtonDisabled(true);
                        }
                      }, 100);

                      setTimeout(() => {
                        onScroll();
                      }, 150);

                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          onClose();
                        }
                      }, 1700);
                    }}
                  >
                    Guardar cambios
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
