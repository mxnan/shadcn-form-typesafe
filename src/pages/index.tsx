import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { motion} from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { registerSchema } from '@/validators/auth';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
 

const inter = Inter({ subsets: ['latin'] });
type Input = z.infer<typeof registerSchema>;

export default function Home() {
  const { toast } = useToast(); 
  const [formStep, setFormStep] = React.useState(0); 
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
      studentId: "",
      year:"",
    }
  });
  console.log(form.watch());

  function onSubmit (data:Input) {
    if(data.confirmPassword !== data.password) {
      toast({
        title:'Passwords do not match',
        variant: "destructive",
      });
      return;
    };
    alert(JSON.stringify(data, null, 4));
    console.log(data);
  }
  return (
    <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
     <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Start the journey with us today</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-3 overflow-x-hidden">
        {/* Page one */}
        <motion.div 
        className={
          cn("space-y-3", {
           //hidden: formStep == 1,
          })}
          // formStep == 0 => translateX ==0
          // formStep == 1 => translatex == '-100%'
          animate ={{
            translateX: `-${ formStep * 100}% `,
          }}
          transition={{
            ease: "easeInOut",
          }}
        >
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
             <FormMessage />
            </FormItem>
          )}
        />
        {/* studentID */}
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Student ID" {...field} />
              </FormControl>
             <FormMessage />
            </FormItem>
          )}
        />
        {/* year */}
        <FormField
          control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of study</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[10, 11, 12, 13].map((year) => {
                            return (
                              <SelectItem value={year.toString()} key={year}>
                                Year {year}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
          )}
        />
        </motion.div>

         {/* Page two */}

        <motion.div 
        className={
          cn("space-y-3 absolute top-0 left-0 right-0", {
            //hidden: formStep == 0,

          })}
         // formstep ==0 => translatex ==100%
         // formstep == 1 -> trnaslatex --0\
         animate={{
          translateX: `${100 - formStep *100}%`,
         }}
         style={{
          translateX: `${100 - formStep *100}%`,
         }}
         transition={{
          ease: "easeInOut",
        }}
          >
        {/* pwd */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} type="password" />
              </FormControl>
             <FormMessage />
            </FormItem>
          )}
        />
        {/* confirmpwd */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm your password" {...field} type="password" />
              </FormControl>
             <FormMessage />
            </FormItem>
          )}
        />
        </motion.div>
        <div className="flex gap-2">
        <Button type="submit" className={
          cn({
            hidden: formStep ==0,
          })
        }>
          Submit
        </Button>
        <Button type="button" 
        variant={'ghost'} 
        className={
          cn({
            hidden: formStep ==1,
          })
        }
        onClick={() =>{
          //validation of previous formstep
          form.trigger(['email','name','year','studentId'])
          const emailState = form.getFieldState('email')
          const nameState = form.getFieldState('name')
          const yearState = form.getFieldState('year')
          const IdState = form.getFieldState('studentId')

          if(!emailState.isDirty || emailState.invalid) return;
          if(!nameState.isDirty || emailState.invalid) return;
          if(!yearState.isDirty || emailState.invalid) return;
          if(!IdState.isDirty || emailState.invalid) return;

          setFormStep(1)
        }}>
          Next Step
        <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button 
        type="button" 
        variant={'ghost'}
        onClick={() =>{
          setFormStep(0);
        }}
        className={
          cn({
            hidden: formStep ==0,
          })
        }>
        <ArrowLeft className="w-4 h-4 mr-2" />
          GO back
        
        </Button>
        </div>
      </form>
    </Form>
      </CardContent>
     </Card>
    </div>
  )
}
