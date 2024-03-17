import stop from '../assets/imagebus2.jpg'

import pin from "@/assets/pin.png"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

function VehicleComponent({ vehicle }) {
  return (

    <div className='w-full h-32 bg-white border rounded-xl flex px-2 py-4 gap-5'>
      <div className=''>
        <img src={pin} alt="" className='w-24' />
      </div>

      <div>
        <h1 className='text-xl font-bold'>{vehicle.Brand} {vehicle.Model} {vehicle.Color}</h1>
        <p>Placa: {vehicle.Id}</p>
        <p>Año: {vehicle.Year}</p>
      </div>
    </div>
  )
}

const formSchema = z.object({
  Brand: z.string().min(4, {
    message: "El largo debe ser mayor a cuatro carácteres",
  }),
  Model: z.string().min(2, { message: "Inválido" }),
  Id: z.string().min(5, { message: "Inválido" }),
  Color: z.string().min(3, { message: "Color Inválido" }),
  Year: z.string().min(4, { message: "Inválido" }),
})

export default function BusPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8081/bus-page')
      .then(response => response.json())
      .then(data => { setData(data) })
  }, [])

  const backgroundStyle = {
    backgroundImage: `url(${stop})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "200vw"
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Brand: "",
      Model: "",
      Id: "",
      Color: "",
      Year: "",
    },
  })

  // 2. Define a submit handler.
  async function handleSubmit(values: z.infer<typeof formSchema>) {

    try {
      const response = await fetch('http://localhost:8081/bus-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });
      if (!response.ok) throw new Error('Network response was not ok');

    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }

    console.log(data)
  }

  return (
    <>
      <main>
        <div style={backgroundStyle} className='w-full h-[100vh] flex items-end'>

          <div className='w-full border border-transparent bottom-0 p-10 flex flex-col gap-5 overflow-scroll pb-20'>
            <Drawer>
              <DrawerTrigger><Button className='w-full py-6 bg-white/80 text-black'>Ver Vehículos</Button></DrawerTrigger>
              <DrawerContent className='p-4 space-y-10'>
                <DrawerHeader>
                  <DrawerTitle>Vehículos</DrawerTitle>
                </DrawerHeader>

                <div className='max-h-96 overflow-scroll flex flex-col gap-5'>
                  {
                    data.map(data => <VehicleComponent vehicle={data} />)
                  }
                </div>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className='w-12 h-12 absolute bottom-14 right-10 rounded-full bg-blue-900/70'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Añadir Nuevo Vehículo</AlertDialogTitle>
                      <AlertDialogDescription>
                        Añade un nuevo vehículo a la lista.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="Brand"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Marca</FormLabel>
                              <FormControl>
                                <Input placeholder="Hyundai, Toyota, Mercedes..."{...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="Model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Modelo</FormLabel>
                              <FormControl>
                                <Input placeholder="Corolla, CRV..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="Color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color</FormLabel>
                              <FormControl>
                                <Input placeholder="Azul, Amarillo..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="Id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Placa (ID)</FormLabel>
                              <FormControl>
                                <Input placeholder="XXXXXXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="Year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Año</FormLabel>
                              <FormControl>
                                <Input placeholder="1990, 1999, 2005..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button className='w-full' type="submit">Submit</Button>
                      </form>
                    </Form>

                    <AlertDialogFooter>
                      <AlertDialogCancel className='bg-red-500 text-white'>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>

                  </AlertDialogContent>

                </AlertDialog>


                <DrawerFooter>
                  <DrawerClose className='w-full flex justify-center'>
                    <div className='w-10'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='text-white'><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
                    </div>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

          </div>
        </div>
      </main>

    </>
  )
}
