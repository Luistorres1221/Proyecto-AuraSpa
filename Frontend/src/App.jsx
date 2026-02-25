import { useState, useMemo, useEffect, useRef, createContext, useContext } from "react";

/* ═══════════════════════════ TRANSLATIONS ══════════════════════════════ */
const TR = {
  es: {
    brand:"Aura Spa",
    nav:{ home:"Inicio",services:"Nuestros Servicios",about:"Acerca de",login:"Iniciar sesión",register:"Registrarse",logout:"Cerrar sesión",myApts:"Mis Citas",book:"Reservar",profile:"Mi Perfil" },
    hero:{ title:"Bienestar que transforma",sub:"Descubre una experiencia de spa diseñada para ti. Reserva tu cita en minutos.",cta:"Reservar ahora",ctaSecondary:"Ver servicios" },
    servicesSection:{ title:"Nuestros Servicios",sub:"Tratamientos de alta calidad para tu cuerpo y mente" },
    about:{ title:"Acerca de Aura Spa",missionTitle:"Misión",missionText:"Brindar experiencias de bienestar y estética de alta calidad, en un ambiente tranquilo y seguro, promoviendo el cuidado integral de nuestros clientes a través de servicios personalizados y profesionales.",visionTitle:"Visión",visionText:"Ser el spa de referencia en Colombia, reconocido por la excelencia en nuestros servicios, el compromiso con el bienestar de nuestros clientes y la formación continua de nuestro equipo profesional.",historyTitle:"Nuestra Historia",historyText:"Aura Spa nació en 2015 con el sueño de crear un espacio donde la serenidad y el bienestar fueran la prioridad. Comenzamos como un pequeño salón con 2 terapeutas apasionadas por el cuidado integral. Hoy, después de casi una década, nos hemos convertido en el destino preferido de más de 3.000 clientes satisfechas en Bogotá.",whoAreWeTitle:"Quiénes Somos",whoAreWeText:"Somos un equipo de profesionales certificadas en estética, masoterapia y bienestar holístico, dedicadas a ofrecer tratamientos personalizados que respetan los ritmos y necesidades de cada cliente. Creemos que la verdadera belleza viene del cuidado integral.",valuesTitle:"Nuestros Valores",dataTitle:"AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES",dataText:"AURA SPA S.A.S.\n\n1. Responsable del Tratamiento\nAURA SPA S.A.S., sociedad comercial legalmente constituida en Colombia, identificada con NIT 805.123.321-4, quien en adelante se denominará (\"LA COMPAÑÍA\"), actuará como Responsable del Tratamiento de los Datos Personales, conforme a lo establecido en la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas que los modifiquen o sustituyan.\n\n2. Finalidades del Tratamiento\nLos datos personales recolectados serán utilizados para:\n1. Gestionar la relación comercial y la prestación de los servicios ofrecidos por AURA SPA S.A.S.\n2. Agendar, confirmar y cancelar citas o tratamientos.\n3. Elaborar registros necesarios para la adecuada prestación de los servicios, incluyendo información relevante para la seguridad del usuario.\n4. Facturación, gestión de pagos y cumplimiento de obligaciones contables y tributarias.\n5. Enviar información sobre promociones, novedades y campañas comerciales.\n6. Evaluar la calidad del servicio mediante encuestas de satisfacción.\n7. Cumplir obligaciones legales ante autoridades administrativas o judiciales.\n8. Implementar medidas de seguridad, incluyendo sistemas de video-vigilancia.\n9. Desarrollar programas de fidelización.\n10. Dar respuesta a consultas, peticiones, quejas y reclamos.\n11. Las demás necesarias para el adecuado desarrollo del objeto social de LA COMPAÑÍA.\n\n3. Autorización\nManifiesto que autorizo de manera libre, previa, expresa, voluntaria e informada a AURA SPA S.A.S., para recolectar, almacenar, usar, circular, suprimir, procesar, compilar, intercambiar, actualizar, transmitir y transferir los Datos Personales suministrados por mí.\n\n4. Derechos del Titular\nSe informa que:\n1. Es facultativo responder preguntas sobre datos sensibles o datos de menores de edad.\n2. El Titular tiene derecho a conocer, actualizar, rectificar y suprimir sus datos personales.\n3. Puede solicitar prueba de la autorización otorgada.\n4. Puede revocar la autorización cuando no se respeten los principios legales.\n5. Puede presentar quejas ante la Superintendencia de Industria y Comercio.\n6. Puede acceder gratuitamente a sus datos personales.\nPara ejercer estos derechos, el Titular podrá comunicarse a los canales oficiales que disponga AURA SPA S.A.S.",termsTitle:"Términos y Condiciones",termsText:"Al utilizar la plataforma Aura Spa, el usuario acepta estos términos. Las citas deben cancelarse con mínimo 2 horas de anticipación. Aura Spa se reserva el derecho de reprogramar citas en casos de fuerza mayor. Los precios son de referencia y pueden variar.",cookiesTitle:"Política de Cookies",cookiesText:"Aura Spa utiliza cookies técnicas estrictamente necesarias para la gestión de sesión. No se utilizan cookies de rastreo ni publicidad de terceros. Al continuar navegando aceptas estas cookies esenciales.",contactTitle:"Contáctenos",contactSubtitle:"¿Preguntas? Déjanos tus datos y nos comunicaremos contigo." },
    booking:{ title:"Reservar Cita",selectService:"Nuestros Servicios",selectServiceSub:"Selecciona el servicio que deseas",selectSchedule:"Horario",selectScheduleSub:"Elige profesional, fecha y hora",confirm:"Confirmar Reserva",confirmSub:"Revisa los detalles antes de confirmar",success:"¡Cita Confirmada!",successSub:"Tu reserva ha sido registrada.",newBook:"Nueva reserva",viewApts:"Ver mis citas",professional:"Profesional",selectPro:"Selecciona una terapeuta",date:"Fecha",availableSlots:"Horarios disponibles",noSlots:"Sin disponibilidad para esta fecha.",continue:"Continuar →",modify:"Modificar",confirmBtn:"Confirmar cita",back:"← Volver" },
    history:{ title:"Mis Citas",sub:"Historial de reservas",empty:"No tienes citas registradas aún.",firstBook:"Hacer primera reserva" },
    status:{ pending:"Pendiente",confirmed:"Confirmada",cancelled:"Cancelada",attended:"Atendida",rescheduled:"Reprogramada" },
    cancelModal:{ title:"Cancelar cita",body:"¿Confirmas que deseas cancelar esta cita?",yes:"Sí, cancelar",no:"No, conservar" },
    accessibility:{ skip:"Ir al contenido principal",increase:"Aumentar texto",decrease:"Disminuir texto",highContrast:"Alto contraste",resetAccess:"Restablecer" },
    min:"min",lang:"ES",
    categories:{ Masajes:"Masajes",Manicure:"Manicure",Pedicure:"Pedicure",Depilación:"Depilación",Facial:"Facial",Otro:"Otro" },
    footer:{ rights:"© 2026 Aura Spa S.A.S. – Todos los derechos reservados.",data:"Datos Personales",terms:"Términos",cookies:"Cookies" },
    admin:{ summary:"Resumen",appointments:"Citas",services:"Servicios",professionals:"Profesionales",users:"Usuarios",today:"Citas hoy",confirmed:"Confirmadas",pending:"Pendientes",attended:"Atendidas",cancelled:"Canceladas",agenda:"Agenda de hoy",noToday:"Sin citas para hoy.",manage:"Gestionar",allFilter:"Todas",noFilter:"Sin citas con este filtro.",newService:"+ Nuevo servicio",newPro:"+ Nueva terapeuta",activeApts:"citas activas",detail:"Detalle de Cita",client:"Cliente",phone:"Teléfono",email:"Correo",service:"Servicio",duration:"Duración",professional:"Profesional",dateTime:"Fecha y hora",statusLbl:"Estado",notes:"Observaciones",notesPlaceholder:"Notas internas...",doConfirm:"✓ Confirmar",doAttended:"✓ Atendida",doReschedule:"🗓 Reprogramar",doCancel:"✕ Cancelar",restore:"Restaurar",trace:"Trazabilidad",newDate:"Nueva fecha y hora",newDateLbl:"Fecha",confirmResched:"Confirmar reprogramación",cancelResched:"Cancelar",serviceName:"Nombre *",category:"Categoría",durationMin:"Duración (min)",price:"Precio COP",save:"Guardar",cancel:"Cancelar",proName:"Nombre *",specialty:"Especialidad",startTime:"Inicio jornada",endTime:"Fin jornada",active:"Activo",inactive:"Inactivo",activeF:"Activa",inactiveF:"Inactiva",adminPanel:"Panel Admin" },
    profile:{ title:"Mi Perfil",subtitle:"Gestiona tu información personal",name:"Nombre completo",emailLbl:"Correo electrónico",phoneLbl:"Teléfono",roleLbl:"Rol",roleAdmin:"Administrador",roleClient:"Cliente",roleProfessional:"Terapeuta",memberSince:"Miembro desde",totalApts:"Citas totales",attendedApts:"Atendidas",editProfile:"Editar perfil",saveChanges:"Guardar cambios",cancel:"Cancelar",changePassword:"Cambiar contraseña",currentPwd:"Contraseña actual",newPwd:"Nueva contraseña",confirmNewPwd:"Confirmar nueva contraseña",pwdChanged:"Contraseña actualizada.",pwdWrong:"Contraseña actual incorrecta.",pwdMismatch:"Las contraseñas no coinciden.",profileUpdated:"Perfil actualizado.",usersTitle:"Gestión de Usuarios",usersSubtitle:"Administra todos los usuarios del sistema",newUser:"+ Nuevo usuario",editUser:"Editar",deleteUser:"Eliminar",cantDeleteSelf:"No puedes eliminar tu propia cuenta.",cantDeleteLast:"Debe existir al menos un administrador.",userSaved:"Usuario guardado.",userExists:"Este correo ya está registrado.",confirmDelete:"¿Eliminar usuario?",confirmDeleteBody:"Esta acción no se puede deshacer.",yes:"Sí, eliminar",no:"Cancelar",usersCount:"usuarios registrados",allRoles:"Todos los roles",noUsers:"Sin usuarios con este filtro.",passwordLbl:"Contraseña",roleAssigned:"Rol asignado",searchUser:"Buscar usuario..." },
    auth:{ login:"Iniciar sesión",register:"Registrarse",email:"Correo *",password:"Contraseña *",confirmPwd:"Confirmar contraseña *",name:"Nombre *",phone:"Teléfono",enter:"Ingresar",create:"Crear cuenta",wrongCreds:"Credenciales incorrectas.",fillAll:"Completa todos los campos.",pwdMismatch:"Las contraseñas no coinciden.",emailUsed:"Correo ya registrado.",forgotPassword:"¿Olvidaste tu contraseña?",recoverTitle:"Recuperar Contraseña",recoverSub:"Ingresa tu correo para restablecer tu contraseña",recoverBtn:"Enviar enlace de recuperación",recoverSent:"Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",resetTitle:"Restablecer Contraseña",resetSub:"Crea una nueva contraseña segura",newPassword:"Nueva contraseña *",confirmPassword:"Confirmar contraseña *",resetBtn:"Restablecer contraseña",invalidToken:"El enlace ha expirado. Solicita uno nuevo.",backToLogin:"Volver a Iniciar sesión",passwordRequirements:"Mínimo 8 caracteres, debe contener letras y números" },
  },
  en: {
    brand:"Aura Spa",
    nav:{ home:"Home",services:"Our Services",about:"About",login:"Sign in",register:"Sign up",logout:"Sign out",myApts:"My Appointments",book:"Book",profile:"My Profile" },
    hero:{ title:"Wellness that transforms",sub:"Discover a spa experience designed for you. Book your appointment in minutes.",cta:"Book now",ctaSecondary:"View services" },
    servicesSection:{ title:"Our Services",sub:"High-quality treatments for your body and mind" },
    about:{ title:"About Aura Spa",missionTitle:"Mission",missionText:"To provide high-quality wellness and aesthetic experiences in a calm and safe environment, promoting the comprehensive care of our clients through personalized and professional services.",visionTitle:"Vision",visionText:"To be Colombia's reference spa, recognized for excellence in services, commitment to client wellbeing, and continuous professional development.",historyTitle:"Our Story",historyText:"Aura Spa was born in 2015 with the dream of creating a space where serenity and wellbeing were our priority. We started as a small salon with 2 therapists passionate about holistic care. Today we are the preferred destination for over 3,000 satisfied clients.",whoAreWeTitle:"Who We Are",whoAreWeText:"We are a team of professionals certified in aesthetics, massage therapy, and holistic wellness. We offer personalized treatments that respect each client's rhythms and needs. We believe true beauty comes from comprehensive physical and emotional care.",valuesTitle:"Our Values",dataTitle:"AUTHORIZATION FOR PERSONAL DATA PROCESSING",dataText:"AURA SPA S.A.S.\n\n1. Data Controller\nAURA SPA S.A.S., a duly legally constituted commercial company in Colombia, identified with NIT 805.123.321-4, hereinafter referred to as (\"THE COMPANY\"), shall be responsible for processing personal data in accordance with Law 1581 of 2012, Decree 1377 of 2013, and any other related regulations.\n\n2. Processing Purposes\nPersonal data collected will be used for:\n1. Managing the business relationship and provision of services offered by AURA SPA S.A.S.\n2. Scheduling, confirming, and cancelling appointments or treatments.\n3. Creating necessary records for proper service delivery, including information relevant to user safety.\n4. Billing, payment management, accounting, and tax compliance.\n5. Sending information about promotions, news, and commercial campaigns.\n6. Evaluating service quality through satisfaction surveys.\n7. Complying with legal obligations to administrative or judicial authorities.\n8. Implementing security measures, including video surveillance systems.\n9. Developing loyalty programs.\n10. Responding to inquiries, requests, complaints, and claims.\n11. Other purposes necessary for the proper development of THE COMPANY's business.\n\n3. Authorization\nI express my free, prior, explicit, voluntary, and informed authorization to AURA SPA S.A.S. to collect, store, use, share, delete, process, compile, exchange, update, transmit, and transfer personal data provided by me.\n\n4. Rights of the Data Subject\nPlease note that:\n1. It is voluntary to answer questions about sensitive data or data of minors.\n2. The Data Subject has the right to access, update, correct, and delete their personal data.\n3. You may request proof of the authorization granted.\n4. You may revoke authorization when legal principles are not respected.\n5. You may file complaints with the Superintendence of Industry and Commerce.\n6. You may access your personal data free of charge.\nTo exercise these rights, the Data Subject may contact the official channels provided by AURA SPA S.A.S.",termsTitle:"Terms & Conditions",termsText:"By using the Aura Spa platform, the user accepts these terms. Appointments must be cancelled at least 2 hours in advance. Aura Spa reserves the right to reschedule in cases of force majeure. Prices are for reference and may vary.",cookiesTitle:"Cookie Policy",cookiesText:"Aura Spa uses strictly necessary cookies for session management. No tracking or third-party advertising cookies are used. Continuing to browse implies acceptance of these essential cookies.",contactTitle:"Contact Us",contactSubtitle:"Questions? Leave us your details and we will contact you soon." },
    booking:{ title:"Book Appointment",selectService:"Our Services",selectServiceSub:"Select the service you want",selectSchedule:"Schedule",selectScheduleSub:"Choose professional, date and time",confirm:"Confirm Booking",confirmSub:"Review the details before confirming",success:"Appointment Confirmed!",successSub:"Your booking has been registered.",newBook:"New booking",viewApts:"View my appointments",professional:"Professional",selectPro:"Select a therapist",date:"Date",availableSlots:"Available slots",noSlots:"No availability for this date.",continue:"Continue →",modify:"Modify",confirmBtn:"Confirm appointment",back:"← Back" },
    history:{ title:"My Appointments",sub:"Booking history",empty:"You have no appointments yet.",firstBook:"Make first booking" },
    status:{ pending:"Pending",confirmed:"Confirmed",cancelled:"Cancelled",attended:"Attended",rescheduled:"Rescheduled" },
    cancelModal:{ title:"Cancel appointment",body:"Are you sure you want to cancel?",yes:"Yes, cancel",no:"No, keep it" },
    accessibility:{ skip:"Skip to main content",increase:"Increase text",decrease:"Decrease text",highContrast:"High contrast",resetAccess:"Reset" },
    min:"min",lang:"EN",
    categories:{ Masajes:"Massages",Manicure:"Manicure",Pedicure:"Pedicure",Depilación:"Hair removal",Facial:"Facial",Otro:"Other" },
    footer:{ rights:"© 2026 Aura Spa S.A.S. – All rights reserved.",data:"Personal Data",terms:"Terms",cookies:"Cookies" },
    admin:{ summary:"Summary",appointments:"Appointments",services:"Services",professionals:"Professionals",users:"Users",today:"Today's apts",confirmed:"Confirmed",pending:"Pending",attended:"Attended",cancelled:"Cancelled",agenda:"Today's agenda",noToday:"No appointments today.",manage:"Manage",allFilter:"All",noFilter:"No appointments with this filter.",newService:"+ New service",newPro:"+ New therapist",activeApts:"active apts",detail:"Appointment Detail",client:"Client",phone:"Phone",email:"Email",service:"Service",duration:"Duration",professional:"Professional",dateTime:"Date & time",statusLbl:"Status",notes:"Notes",notesPlaceholder:"Internal notes...",doConfirm:"✓ Confirm",doAttended:"✓ Mark Attended",doReschedule:"🗓 Reschedule",doCancel:"✕ Cancel",restore:"Restore",trace:"History",newDate:"New date & time",newDateLbl:"Date",confirmResched:"Confirm reschedule",cancelResched:"Cancel",serviceName:"Name *",category:"Category",durationMin:"Duration (min)",price:"Price COP",save:"Save",cancel:"Cancel",proName:"Name *",specialty:"Specialty",startTime:"Start time",endTime:"End time",active:"Active",inactive:"Inactive",activeF:"Active",inactiveF:"Inactive",adminPanel:"Admin Panel" },
    profile:{ title:"My Profile",subtitle:"Manage your personal information",name:"Full name",emailLbl:"Email address",phoneLbl:"Phone",roleLbl:"Role",roleAdmin:"Administrator",roleClient:"Client",roleProfessional:"Therapist",memberSince:"Member since",totalApts:"Total appointments",attendedApts:"Attended",editProfile:"Edit profile",saveChanges:"Save changes",cancel:"Cancel",changePassword:"Change password",currentPwd:"Current password",newPwd:"New password",confirmNewPwd:"Confirm new password",pwdChanged:"Password updated.",pwdWrong:"Current password is incorrect.",pwdMismatch:"Passwords do not match.",profileUpdated:"Profile updated.",usersTitle:"User Management",usersSubtitle:"Manage all system users",newUser:"+ New user",editUser:"Edit",deleteUser:"Delete",cantDeleteSelf:"You cannot delete your own account.",cantDeleteLast:"At least one administrator must exist.",userSaved:"User saved.",userExists:"Email already registered.",confirmDelete:"Delete user?",confirmDeleteBody:"This action cannot be undone.",yes:"Yes, delete",no:"Cancel",usersCount:"registered users",allRoles:"All roles",noUsers:"No users with this filter.",passwordLbl:"Password",roleAssigned:"Assigned role",searchUser:"Search user..." },
    auth:{ login:"Sign in",register:"Sign up",email:"Email *",password:"Password *",confirmPwd:"Confirm password *",name:"Full name *",phone:"Phone",enter:"Sign in",create:"Create account",wrongCreds:"Incorrect credentials.",fillAll:"Please fill all required fields.",pwdMismatch:"Passwords do not match.",emailUsed:"Email already registered.",forgotPassword:"Forgot your password?",recoverTitle:"Recover Password",recoverSub:"Enter your email to reset your password",recoverBtn:"Send recovery link",recoverSent:"If the email is registered, you will receive a link to reset your password.",resetTitle:"Reset Password",resetSub:"Create a secure new password",newPassword:"New password *",confirmPassword:"Confirm password *",resetBtn:"Reset password",invalidToken:"The link has expired. Request a new one.",backToLogin:"Back to Sign In",passwordRequirements:"Minimum 8 characters, must contain letters and numbers" },
  }
};

/* ═══════════════════════════ CONTEXTS ══════════════════════════════════ */
const LangCtx = createContext();
const useLang = () => useContext(LangCtx);
const A11yCtx = createContext();
const useA11y = () => useContext(A11yCtx);

/* ═══════════════════════════ GLOBAL STYLES ═════════════════════════════ */
const GlobalStyle = ({ fontSize, highContrast: hc }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{font-size:${fontSize}px;scroll-behavior:smooth;height:100%;width:100%;}
    body{font-family:'DM Sans',sans-serif;background:${hc?'#000':'#FAF7F2'};color:${hc?'#fff':'#3D2B24'};line-height:1.6;height:100vh;width:100vw;overflow-x:hidden;margin:0;padding:0;}
    #root{height:100%;width:100%;display:flex;flex-direction:column;}
    ::-webkit-scrollbar{width:12px;}::-webkit-scrollbar-track{background:#E8DDD0;}::-webkit-scrollbar-thumb{background:#C4B5A5;border-radius:6px;transition:background 0.2s;}::-webkit-scrollbar-thumb:hover{background:#8B6F5E;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    @keyframes scaleIn{from{opacity:0;transform:scale(0.96);}to{opacity:1;transform:scale(1);}}
    .anim-fadeup{animation:fadeUp 0.45s ease both;}.anim-fadein{animation:fadeIn 0.3s ease both;}.anim-scalein{animation:scaleIn 0.3s ease both;}
    input,select,textarea{font-family:'DM Sans',sans-serif;outline:none;}
    button{cursor:pointer;font-family:'DM Sans',sans-serif;}
    a{color:inherit;text-decoration:none;}
    .tag-confirmed{background:${hc?'#fff':'#EAF5EC'};color:${hc?'#000':'#1E7E34'};}
    .tag-pending{background:${hc?'#fff':'#FEF9EC'};color:${hc?'#000':'#856404'};}
    .tag-cancelled{background:${hc?'#fff':'#FDECEA'};color:${hc?'#000':'#9B1C1C'};}
    .tag-attended{background:${hc?'#fff':'#EEF2FF'};color:${hc?'#000':'#3730A3'};}
    .tag-rescheduled{background:${hc?'#fff':'#FFF4ED'};color:${hc?'#000':'#9A3412'};}
    *:focus-visible{outline:3px solid #C9A96E !important;outline-offset:2px;}
    .skip-link{position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;}
    .skip-link:focus{position:fixed;top:0;left:0;width:auto;height:auto;padding:12px 20px;background:#3D2B24;color:#FAF7F2;z-index:9999;font-size:14px;border-radius:0 0 8px 0;}
    @media(max-width:768px){.hide-mobile{display:none!important;}.show-mobile{display:flex!important;}}
    @media(min-width:769px){.show-mobile{display:none!important;}}
  `}</style>
);

/* ═══════════════════════════ PALETTE ══════════════════════════════════ */
const C={cream:"#FAF7F2",sand:"#E8DDD0",taupe:"#C4B5A5",brown:"#8B6F5E",espresso:"#3D2B24",sage:"#7A8C6E",gold:"#C9A96E",blush:"#D4A5A5",white:"#FFFFFF",g100:"#F5F5F5",g400:"#9CA3AF",g600:"#6B7280"};
const cc=(hc)=>hc?{...C,cream:"#000",sand:"#222",taupe:"#555",brown:"#bbb",espresso:"#fff",white:"#111",g100:"#111",g400:"#aaa",g600:"#ccc"}:C;

/* ═══════════════════════════ COLOMBIA DEPARTMENTS & CITIES ════════════ */
const DEPARTMENTS_COLOMBIA={
  "Bogotá":{cities:["Bogotá"]},
  "Amazonas":{cities:["Leticia","Puerto Nariño"]},
  "Antioquia":{cities:["Medellín","Bello","Itagüí","Envigado","Sabaneta","Rionegro","Marinilla","Guarne"]},
  "Arauca":{cities:["Arauca","Fortul","Saravena"]},
  "Atlántico":{cities:["Barranquilla","Soledad","Malambo","Galapa"]},
  "Bolívar":{cities:["Cartagena","Magangué","El Carmen","Turbaco"]},
  "Boyacá":{cities:["Tunja","Duitama","Sogamoso","Paipa","Moniquirá"]},
  "Caldas":{cities:["Manizales","Villamaría","Neira","Palestina"]},
  "Caquetá":{cities:["Florencia","Cartagena del Chairá","San Vicente del Caguán"]},
  "Cauca":{cities:["Popayán","Santander de Quilichao","Bolívar","Corinto"]},
  "Cesar":{cities:["Valledupar","Bosconia","Aguachica","La Paz"]},
  "Córdoba":{cities:["Montería","Lorica","Cereté","Puerto Escondido"]},
  "Cundinamarca":{cities:["Bogotá","Soacha","Zipaquirá","Facatativá","Ubaté","Chía","Cajicá","Vileta"]},
  "Guainía":{cities:["Inírida","La Guadalupe"]},
  "Guaviare":{cities:["San José del Guaviare","Calamar"]},
  "Huila":{cities:["Neiva","La Plata","Garzón","Pitalito"]},
  "La Guajira":{cities:["Riohacha","Maicao","Uribia","Hatonuevo"]},
  "Magdalena":{cities:["Santa Marta","Ciénaga","El Banco","Plato"]},
  "Meta":{cities:["Villavicencio","Acacías","Restrepo","Gachipilá"]},
  "Nariño":{cities:["Pasto","Ipiales","Túquerres","Tumaco"]},
  "Nord de Santander":{cities:["Cúcuta","Los Patios","Villa del Rosario","San Cayetano"]},
  "Putumayo":{cities:["Mocoa","Puerto Caicedo","Puerto Guzmán"]},
  "Quindío":{cities:["Armenia","Pereira","La Tebaida","Montenegro"]},
  "Risaralda":{cities:["Pereira","Dosquebradas","Santa Rosa de Cabal","Cartago"]},
  "Santander":{cities:["Bucaramanga","Floridablanca","Giron","Piedecuesta"]},
  "Sucre":{cities:["Sincelejo","Sampués","Los Palmitos","Corozal"]},
  "Tolima":{cities:["Ibagué","Espinal","Melgar","Guamo"]},
  "Valle del Cauca":{cities:["Cali","Palmira","Buenaventura","Cartago"]},
  "Vaupés":{cities:["Mitú","Carurú"]},
  "Vichada":{cities:["Puerto Carreño","La Primavera"]}
};

/* ═══════════════════════════ SEED DATA ════════════════════════════════ */
const SERVICES_SEED=[
  {id:1,name:"Masaje Relajante",category:"Masajes",duration:60,price:120000,active:true,image:null},
  {id:2,name:"Masaje Descontracturante",category:"Masajes",duration:90,price:160000,active:true,image:null},
  {id:3,name:"Manicure Clásico",category:"Manicure",duration:45,price:35000,active:true,image:null},
  {id:4,name:"Pedicure Spa",category:"Pedicure",duration:60,price:55000,active:true,image:null},
  {id:5,name:"Depilación Piernas",category:"Depilación",duration:45,price:70000,active:true,image:null},
  {id:6,name:"Facial Hidratante",category:"Facial",duration:60,price:95000,active:true,image:null},
];
const PROFESSIONALS_SEED=[
  {id:1,name:"Valentina Torres",specialty:"Masajes & Facial",scheduleStart:"08:00",scheduleEnd:"17:00",active:true},
  {id:2,name:"Camila Ruiz",specialty:"Manicure & Pedicure",scheduleStart:"09:00",scheduleEnd:"18:00",active:true},
  {id:3,name:"Laura Gómez",specialty:"Depilación",scheduleStart:"10:00",scheduleEnd:"19:00",active:true},
];
const todayStr=()=>new Date().toISOString().slice(0,10);
const tomorrowStr=()=>{const d=new Date();d.setDate(d.getDate()+1);return d.toISOString().slice(0,10);};
const APPOINTMENTS_SEED=[
  {id:1,clientName:"Ana Martínez",clientEmail:"ana@email.com",clientPhone:"3001234567",serviceId:1,professionalId:1,date:todayStr(),time:"09:00",status:"confirmed",notes:"",history:[]},
  {id:2,clientName:"Sandra López",clientEmail:"san@email.com",clientPhone:"3009876543",serviceId:3,professionalId:2,date:todayStr(),time:"10:00",status:"pending",notes:"",history:[]},
  {id:3,clientName:"María Jiménez",clientEmail:"mar@email.com",clientPhone:"3115556677",serviceId:5,professionalId:3,date:todayStr(),time:"11:00",status:"attended",notes:"Cliente puntual",history:[]},
  {id:4,clientName:"Paola Castro",clientEmail:"pao@email.com",clientPhone:"3204443322",serviceId:6,professionalId:1,date:tomorrowStr(),time:"14:00",status:"confirmed",notes:"",history:[]},
  {id:5,clientName:"Juliana Vargas",clientEmail:"jul@email.com",clientPhone:"3177778899",serviceId:2,professionalId:1,date:tomorrowStr(),time:"10:30",status:"cancelled",notes:"Canceló por viaje",history:[]},
];
const USERS_SEED=[
  {id:1,email:"admin@auraspa.com",password:"admin123",role:"admin",name:"Administrador",phone:"3001112233",createdAt:"2024-01-15"},
  {id:2,email:"cliente@email.com",password:"cliente123",role:"client",name:"Cliente Demo",phone:"3009998877",createdAt:"2024-03-20"},
  {id:3,email:"valentina@auraspa.com",password:"val123",role:"professional",name:"Valentina Torres",phone:"3115556677",createdAt:"2024-02-10"},
];

/* ═══════════════════════════ HELPERS ══════════════════════════════════ */
const fmt=n=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n);
const fmtD=d=>new Date(d+"T12:00:00").toLocaleDateString("es-CO",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
const SC={pending:"tag-pending",confirmed:"tag-confirmed",cancelled:"tag-cancelled",attended:"tag-attended",rescheduled:"tag-rescheduled"};
const EMOJI={Masajes:"💆",Manicure:"💅",Pedicure:"🦶",Depilación:"✨",Facial:"🌸"};
const ROLE_COLORS={admin:{bg:"#FEF3C7",color:"#92400E"},client:{bg:"#EEF2FF",color:"#3730A3"},professional:{bg:"#ECFDF5",color:"#065F46"}};
const ROLE_ICONS={admin:"👑",client:"🌸",professional:"💆"};

function genSlots(start,end,dur){
  const slots=[];let[sh,sm]=start.split(":").map(Number);
  const[eh,em]=end.split(":").map(Number);const endMin=eh*60+em;
  while(sh*60+sm+dur<=endMin){slots.push(`${String(sh).padStart(2,"0")}:${String(sm).padStart(2,"0")}`);sm+=dur;if(sm>=60){sh+=Math.floor(sm/60);sm=sm%60;}}
  return slots;
}
function getSlots(svcId,proId,date,apts,svcs,pros){
  const svc=svcs.find(s=>s.id===svcId),pro=pros.find(p=>p.id===proId);
  if(!svc||!pro)return[];
  const all=genSlots(pro.scheduleStart,pro.scheduleEnd,svc.duration);
  const booked=apts.filter(a=>a.professionalId===proId&&a.date===date&&a.status!=="cancelled").map(a=>a.time);
  return all.filter(s=>!booked.includes(s));
}

/* ═══════════════════════════ ATOMS ════════════════════════════════════ */
const Tag=({status})=>{const{t}=useLang();return<span style={{fontSize:11,fontWeight:500,padding:"3px 10px",borderRadius:20,letterSpacing:"0.04em"}}className={SC[status]}>{t.status[status]}</span>;};

const RoleBadge=({role})=>{
  const{t}=useLang();const rc=ROLE_COLORS[role]||ROLE_COLORS.client;
  const label={admin:t.profile.roleAdmin,client:t.profile.roleClient,professional:t.profile.roleProfessional}[role]||role;
  return<span style={{fontSize:11,fontWeight:600,padding:"3px 12px",borderRadius:20,background:rc.bg,color:rc.color,letterSpacing:"0.04em"}}>{ROLE_ICONS[role]} {label}</span>;
};

const Avatar=({name,size=48,role})=>{
  const initials=(name||"?").split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  const roleColors={admin:["#3D2B24","#C9A96E"],client:["#7A8C6E","#FAF7F2"],professional:["#8B6F5E","#FAF7F2"]};
  const[bg,fg]=roleColors[role]||roleColors.client;
  return<div aria-hidden="true"style={{width:size,height:size,borderRadius:"50%",background:bg,color:fg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.36,fontWeight:600,fontFamily:"Cormorant Garamond,serif",flexShrink:0}}>{initials}</div>;
};

const Lbl=({children,htmlFor})=>{const{hc}=useA11y();const col=cc(hc);return<label htmlFor={htmlFor}style={{fontSize:12,fontWeight:500,color:col.brown,letterSpacing:"0.06em",textTransform:"uppercase",display:"block",marginBottom:6}}>{children}</label>;};

const Input=({label,id,...p})=>{
  const{hc}=useA11y();const col=cc(hc);const iid=id||(label?label.replace(/\s+/g,"-").toLowerCase():undefined);
  return<div style={{display:"flex",flexDirection:"column",gap:6}}>{label&&<Lbl htmlFor={iid}>{label}</Lbl>}<input id={iid}aria-label={label}style={{border:`1px solid ${col.sand}`,borderRadius:4,padding:"10px 14px",background:col.white,color:col.espresso,fontSize:14,width:"100%",transition:"border-color 0.2s"}}onFocus={e=>e.target.style.borderColor=col.brown}onBlur={e=>e.target.style.borderColor=col.sand}{...p}/></div>;
};

const Sel=({label,id,children,...p})=>{
  const{hc}=useA11y();const col=cc(hc);const sid=id||(label?label.replace(/\s+/g,"-").toLowerCase():undefined);
  return<div style={{display:"flex",flexDirection:"column",gap:6}}>{label&&<Lbl htmlFor={sid}>{label}</Lbl>}<select id={sid}aria-label={label}style={{border:`1px solid ${col.sand}`,borderRadius:4,padding:"10px 14px",background:col.white,color:col.espresso,fontSize:14,width:"100%",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238B6F5E' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center",paddingRight:36}}{...p}>{children}</select></div>;
};

const Btn=({variant="primary",children,style={},...p})=>{
  const{hc}=useA11y();const col=cc(hc);
  const base={border:"none",borderRadius:3,padding:"10px 22px",fontSize:13,fontWeight:500,letterSpacing:"0.06em",transition:"all 0.2s",cursor:"pointer"};
  const v=hc?{primary:{background:"#fff",color:"#000",border:"2px solid #fff"},secondary:{background:"transparent",color:"#fff",border:"2px solid #fff"},ghost:{background:"transparent",color:"#fff",padding:"8px 14px"},danger:{background:"transparent",color:"#f55",border:"2px solid #f55"},success:{background:"transparent",color:"#5f5",border:"2px solid #5f5"},gold:{background:"#fff",color:"#000"}}:{primary:{background:col.espresso,color:col.cream},secondary:{background:"transparent",color:col.espresso,border:`1px solid ${col.sand}`},ghost:{background:"transparent",color:col.brown,padding:"8px 14px"},danger:{background:"#FDECEA",color:"#9B1C1C",border:"1px solid #FECACA"},success:{background:"#EAF5EC",color:"#1E7E34",border:"1px solid #BBF7D0"},gold:{background:col.gold,color:col.white}};
  return<button style={{...base,...v[variant],...style}}{...p}>{children}</button>;
};

const BackBtn=({onClick})=>{const{t}=useLang();const{hc}=useA11y();const col=cc(hc);return<button onClick={onClick}aria-label={t.booking.back}style={{background:"none",border:"none",color:col.brown,fontSize:13,marginBottom:20,cursor:"pointer",display:"flex",alignItems:"center",gap:6,padding:"6px 0"}}>{t.booking.back}</button>;};

const Card=({children,style={},onClick,...rest})=>{const{hc}=useA11y();const col=cc(hc);return<div style={{background:col.white,border:`1px solid ${col.sand}`,borderRadius:8,...style}}onClick={onClick}{...rest}>{children}</div>;};

const Modal=({title,onClose,children,maxWidth=540})=>{
  const{hc}=useA11y();const col=cc(hc);const ref=useRef();
  useEffect(()=>{ref.current?.focus();},[]);
  return<div className="anim-fadein"role="dialog"aria-modal="true"aria-labelledby="modal-title"style={{position:"fixed",inset:0,background:"rgba(61,43,36,0.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}onClick={e=>e.target===e.currentTarget&&onClose()}><div ref={ref}tabIndex={-1}className="anim-scalein"style={{background:col.white,borderRadius:8,width:"100%",maxWidth,maxHeight:"90vh",overflow:"auto",boxShadow:"0 20px 60px rgba(61,43,36,0.2)"}}><div style={{padding:"20px 24px",borderBottom:`1px solid ${col.sand}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}><h3 id="modal-title"className="display"style={{fontSize:22,fontWeight:400,color:col.espresso}}>{title}</h3><button onClick={onClose}aria-label="Cerrar"style={{background:"none",border:"none",fontSize:24,color:col.taupe,cursor:"pointer",lineHeight:1}}>×</button></div><div style={{padding:24}}>{children}</div></div></div>;
};

const StatCard=({label,value,color})=>{const{hc}=useA11y();const col=cc(hc);return<Card style={{padding:"20px 24px"}}><p style={{fontSize:11,color:col.g600,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{label}</p><p className="display"style={{fontSize:40,fontWeight:300,color:hc?"#fff":(color||col.espresso),lineHeight:1}}>{value}</p></Card>;};

const Toast=({msg,type="success"})=><div className="anim-scalein"style={{position:"fixed",bottom:24,right:24,background:type==="error"?"#FDECEA":"#EAF5EC",color:type==="error"?"#9B1C1C":"#1E7E34",border:`1px solid ${type==="error"?"#FECACA":"#BBF7D0"}`,padding:"12px 20px",borderRadius:8,fontSize:13,fontWeight:500,zIndex:2000,boxShadow:"0 4px 16px rgba(0,0,0,0.1)"}}>{msg}</div>;

const Carousel=({images,title,subtitle})=>{
  const{hc}=useA11y();const col=cc(hc);
  const[currentIdx,setCurrentIdx]=useState(0);const validImages=images?.filter(img=>img);
  if(!validImages||validImages.length===0)return<div style={{height:400,background:`linear-gradient(135deg,${col.sand} 0%,${col.taupe} 100%)`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{textAlign:"center"}}><p style={{fontSize:48,marginBottom:8}}>🖼️</p><p style={{color:col.g600,fontSize:14}}>No hay imágenes disponibles</p></div></div>;
  const goNext=()=>setCurrentIdx(i=>(i+1)%validImages.length);
  const goPrev=()=>setCurrentIdx(i=>(i-1+validImages.length)%validImages.length);
  return<div style={{position:"relative",borderRadius:12,overflow:"hidden",height:"400px",background:col.sand}}>
    <div style={{position:"relative",width:"100%",height:"100%"}}>
      {validImages.map((img,idx)=>(
        <div key={idx}style={{position:"absolute",inset:0,backgroundImage:`url(${img})`,backgroundSize:"cover",backgroundPosition:"center",opacity:idx===currentIdx?1:0,transition:"opacity 0.5s ease-in-out"}}>
          {idx===currentIdx&&<div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(61,43,36,0.3) 0%,rgba(61,43,36,0.15) 100%)"}}/>}
        </div>
      ))}
    </div>
    {validImages.length>1&&<>
      <button onClick={goPrev}aria-label="Anterior"style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.8)",border:"none",width:44,height:44,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:20,transition:"all 0.2s",zIndex:10}}onMouseEnter={e=>e.target.style.background="rgba(255,255,255,0.95)"}onMouseLeave={e=>e.target.style.background="rgba(255,255,255,0.8)"}>◀</button>
      <button onClick={goNext}aria-label="Siguiente"style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.8)",border:"none",width:44,height:44,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:20,transition:"all 0.2s",zIndex:10}}onMouseEnter={e=>e.target.style.background="rgba(255,255,255,0.95)"}onMouseLeave={e=>e.target.style.background="rgba(255,255,255,0.8)"}>▶</button>
      <div style={{position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",display:"flex",gap:6,zIndex:10}}>
        {validImages.map((_,idx)=><button key={idx}onClick={()=>setCurrentIdx(idx)}aria-label={`Imagen ${idx+1}`}style={{width:8,height:8,borderRadius:"50%",background:idx===currentIdx?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.4)",border:"none",cursor:"pointer",transition:"all 0.2s"}}/>)}
      </div>
    </>}
    {title&&<div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(180deg,transparent 0%,rgba(0,0,0,0.6) 100%)",color:"white",padding:"32px 24px",zIndex:5}}><p style={{fontSize:12,textTransform:"uppercase",letterSpacing:"0.1em",opacity:0.8,marginBottom:6}}>{subtitle}</p><h3 className="display"style={{fontSize:28,fontWeight:300,margin:0}}>{title}</h3></div>}
  </div>;
};

/* ═══════════════════════════ ACCESSIBILITY BAR ═════════════════════════ */
function AccessibilityBar(){
  const{t}=useLang();const{fontSize,setFontSize,hc,setHc}=useA11y();
  return<div role="toolbar"aria-label="Accesibilidad"style={{background:"#2a1f1a",padding:"6px 20px",display:"flex",gap:8,alignItems:"center",justifyContent:"flex-end",flexWrap:"wrap"}}>
    <span style={{fontSize:11,color:"#C4B5A5",marginRight:4,letterSpacing:"0.06em",textTransform:"uppercase"}}>♿</span>
    {[["A+",()=>setFontSize(s=>Math.min(s+2,22)),t.accessibility.increase],["A-",()=>setFontSize(s=>Math.max(s-2,12)),t.accessibility.decrease]].map(([lbl,fn,al])=>(
      <button key={lbl}onClick={fn}aria-label={al}style={{background:"rgba(255,255,255,0.1)",border:"none",color:"#FAF7F2",padding:"4px 10px",borderRadius:3,fontSize:12,cursor:"pointer"}}>{lbl}</button>
    ))}
    <button onClick={()=>setHc(h=>!h)}aria-pressed={hc}aria-label={t.accessibility.highContrast}style={{background:hc?"#fff":"rgba(255,255,255,0.1)",border:"none",color:hc?"#000":"#FAF7F2",padding:"4px 10px",borderRadius:3,fontSize:12,cursor:"pointer"}}>{t.accessibility.highContrast}</button>
    <button onClick={()=>{setFontSize(16);setHc(false);}}aria-label={t.accessibility.resetAccess}style={{background:"rgba(255,255,255,0.1)",border:"none",color:"#FAF7F2",padding:"4px 10px",borderRadius:3,fontSize:12,cursor:"pointer"}}>{t.accessibility.resetAccess}</button>
  </div>;
}

/* ═══════════════════════════ NAVBAR ════════════════════════════════════ */
function Navbar({user,page,setPage,onLogout,lang,setLang,spLogo}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[menuOpen,setMenuOpen]=useState(false);
  const navLinks=user
    ?(user.role==="admin"
        ?[{id:"admin",label:t.nav.home}]
        :[{id:"home",label:t.nav.home},{id:"services-page",label:t.nav.services},{id:"about",label:t.nav.about},{id:"contactanos",label:"Contáctanos"},{id:"book",label:t.nav.book},{id:"history",label:t.nav.myApts}])
    :[{id:"home",label:t.nav.home},{id:"services-page",label:t.nav.services},{id:"about",label:t.nav.about},{id:"contactanos",label:"Contáctanos"}];
  return<header role="banner"style={{background:col.white,borderBottom:`1px solid ${col.sand}`,position:"sticky",top:0,zIndex:200}}>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
      <button onClick={()=>setPage("home")}aria-label="Ir a inicio"style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
        {spLogo&& <img src={spLogo}alt="Aura Spa Logo"style={{height:50,width:"auto",maxWidth:120,objectFit:"contain",borderRadius:3}}/>}
        <h1 className="display"style={{fontSize:26,fontWeight:400,color:col.espresso}}>Aura <span style={{color:col.brown}}>Spa</span></h1>
      </button>
      <nav role="navigation"aria-label="Navegación principal"className="hide-mobile"style={{display:"flex",gap:4,alignItems:"center"}}>
        {navLinks.map(l=>(
          <button key={l.id}onClick={()=>setPage(l.id)}aria-current={page===l.id?"page":undefined}style={{background:"none",border:"none",padding:"8px 14px",fontSize:13,cursor:"pointer",color:page===l.id?col.espresso:col.g600,fontWeight:page===l.id?500:400,borderBottom:page===l.id?`2px solid ${col.brown}`:"2px solid transparent",transition:"all 0.2s"}}>{l.label}</button>
        ))}
      </nav>
      <div className="hide-mobile"style={{display:"flex",gap:8,alignItems:"center"}}>
        <button onClick={()=>setLang(l=>l==="es"?"en":"es")}aria-label={`Cambiar idioma`}style={{background:col.sand,border:"none",padding:"6px 12px",borderRadius:3,fontSize:12,fontWeight:600,cursor:"pointer",color:col.espresso,letterSpacing:"0.08em"}}>
          {lang==="es"?"🌐 EN":"🌐 ES"}
        </button>
        {user?<>
          <button onClick={()=>setPage("profile")}aria-label={t.nav.profile}style={{background:"none",border:`1px solid ${col.sand}`,borderRadius:24,display:"flex",alignItems:"center",gap:8,padding:"4px 12px 4px 4px",cursor:"pointer",transition:"all 0.2s"}}>
            <Avatar name={user.name}size={30}role={user.role}/>
            <span style={{fontSize:13,color:col.espresso,fontWeight:500,maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name.split(" ")[0]}</span>
          </button>
          <Btn variant="secondary"style={{fontSize:12,padding:"7px 14px"}}onClick={onLogout}>{t.nav.logout}</Btn>
        </>:<>
          <Btn variant="secondary"style={{fontSize:12,padding:"7px 14px"}}onClick={()=>setPage("login")}>{t.nav.login}</Btn>
          <Btn style={{fontSize:12,padding:"7px 14px"}}onClick={()=>setPage("register")}>{t.nav.register}</Btn>
        </>}
      </div>
      <button className="show-mobile"onClick={()=>setMenuOpen(o=>!o)}aria-expanded={menuOpen}aria-label="Menú"style={{background:"none",border:"none",fontSize:22,color:col.espresso,cursor:"pointer",display:"none"}}>
        {menuOpen?"✕":"☰"}
      </button>
    </div>
    {menuOpen&&<div className="show-mobile anim-fadeup"style={{background:col.white,borderTop:`1px solid ${col.sand}`,padding:16,display:"none",flexDirection:"column",gap:4}}>
      {navLinks.map(l=><button key={l.id}onClick={()=>{setPage(l.id);setMenuOpen(false);}}style={{background:"none",border:"none",padding:"12px 8px",fontSize:14,cursor:"pointer",color:col.g600,textAlign:"left"}}>{l.label}</button>)}
      {user&&<button onClick={()=>{setPage("profile");setMenuOpen(false);}}style={{background:"none",border:"none",padding:"12px 8px",fontSize:14,cursor:"pointer",color:col.g600,textAlign:"left"}}>{t.nav.profile}</button>}
      <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
        <button onClick={()=>setLang(l=>l==="es"?"en":"es")}style={{background:col.sand,border:"none",padding:"8px 14px",borderRadius:3,fontSize:13,cursor:"pointer",color:col.espresso}}>{lang==="es"?"🌐 EN":"🌐 ES"}</button>
        {user?<Btn variant="secondary"onClick={()=>{onLogout();setMenuOpen(false);}}>{t.nav.logout}</Btn>:<>
          <Btn variant="secondary"onClick={()=>{setPage("login");setMenuOpen(false);}}>{t.nav.login}</Btn>
          <Btn onClick={()=>{setPage("register");setMenuOpen(false);}}>{t.nav.register}</Btn>
        </>}
      </div>
    </div>}
  </header>;
}

/* ═══════════════════════════ FOOTER ════════════════════════════════════ */
function Footer({setPage,spLogo}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  return<footer role="contentinfo"style={{background:col.espresso,color:col.cream,padding:"32px 20px",marginTop:60}}>
    <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>{spLogo&&<img src={spLogo}alt="Aura Spa Logo"style={{height:50,width:"auto",maxWidth:100,objectFit:"contain",borderRadius:3}}/>}<div><p className="display"style={{fontSize:22,fontWeight:300,marginBottom:4}}>Aura Spa</p><p style={{fontSize:12,color:col.taupe}}>{t.footer.rights}</p></div></div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        {[["about-data",t.footer.data],["about-terms",t.footer.terms],["about-cookies",t.footer.cookies]].map(([pg,lbl])=>(
          <button key={pg}onClick={()=>setPage(pg)}style={{background:"none",border:"none",color:col.taupe,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>{lbl}</button>
        ))}
      </div>
    </div>
  </footer>;
}

/* ═══════════════════════════ LANDING ══════════════════════════════════ */
function LandingPage({setPage,services,landingImages,carouselImages}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  return<main id="main-content"tabIndex={-1}style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",overflow:"auto"}}>
    <section aria-labelledby="hero-title"style={{background:hc?"#000":`linear-gradient(135deg,${col.espresso} 0%,#5C3D31 60%,#8B6F5E 100%)`,padding:"60px 20px",textAlign:"center",position:"relative",overflow:"hidden",minHeight:"50vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      {!hc&&<div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(ellipse at 30% 50%,rgba(201,169,110,0.15) 0%,transparent 60%)"}}/>}
      <div style={{maxWidth:680,margin:"0 auto",position:"relative"}}>
        <p className="anim-fadeup"style={{fontSize:12,color:"#C4B5A5",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:16}}>✦ Spa & Wellness ✦</p>
        <h2 id="hero-title"className="anim-fadeup display"style={{fontSize:"clamp(36px,6vw,64px)",fontWeight:300,color:col.cream,lineHeight:1.1,marginBottom:20,animationDelay:"0.1s"}}>{t.hero.title}</h2>
        <p className="anim-fadeup"style={{fontSize:16,color:"#C4B5A5",marginBottom:36,lineHeight:1.7,animationDelay:"0.2s"}}>{t.hero.sub}</p>
        <div className="anim-fadeup"style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",animationDelay:"0.3s"}}>
          <Btn variant="gold"style={{padding:"14px 32px",fontSize:14}}onClick={()=>setPage("book")}>{t.hero.cta}</Btn>
          <button onClick={()=>setPage("services-page")}style={{background:"transparent",border:"1px solid rgba(255,255,255,0.3)",color:col.cream,padding:"14px 32px",fontSize:14,borderRadius:3,cursor:"pointer",transition:"all 0.2s",fontFamily:"DM Sans,sans-serif",letterSpacing:"0.06em"}}>{t.hero.ctaSecondary}</button>
        </div>
      </div>
    </section>

    <section style={{padding:"60px 20px",background:col.cream}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:40,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 45%",minWidth:"300px"}}>
          <p style={{fontSize:12,color:col.brown,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:12}}>✦ Nuestra Esencia ✦</p>
          <h3 className="display"style={{fontSize:42,fontWeight:300,color:col.espresso,marginBottom:20,lineHeight:1.2}}>Conecta tu esencia con Aura Spa</h3>
          <p style={{fontSize:16,color:col.g600,lineHeight:1.8,marginBottom:16}}>Revitaliza tu cuerpo y libérate del estrés en un relajante día de spa y belleza.</p>
          <p style={{fontSize:16,color:col.g600,lineHeight:1.8,marginBottom:28}}>Agenda tu cita y disfruta de cualquiera de nuestras terapias de relajación, diseñadas especialmente para ti.</p>
          <Btn style={{padding:"13px 32px",fontSize:14}}onClick={()=>setPage("services-page")}>Ver Portafolio →</Btn>
        </div>
        <div style={{flex:"1 1 45%",minWidth:"300px",background:landingImages?.section1?`url(${landingImages.section1})`:`linear-gradient(135deg,${col.sand} 0%,${col.taupe} 100%)`,backgroundSize:"cover",backgroundPosition:"center",borderRadius:12,height:"400px",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
          {!landingImages?.section1&&<div style={{fontSize:100,opacity:0.3,position:"absolute"}}>💆</div>}
          {!landingImages?.section1&&<div style={{fontSize:80,position:"relative",zIndex:1}}>💆‍♀️</div>}
        </div>
      </div>
    </section>

    <section style={{padding:"60px 20px",background:col.white}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:40,flexWrap:"wrap",flexDirection:"row-reverse"}}>
        <div style={{flex:"1 1 45%",minWidth:"300px"}}>
          <p style={{fontSize:12,color:col.brown,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:12}}>✦ Bienestar Total ✦</p>
          <h3 className="display"style={{fontSize:42,fontWeight:300,color:col.espresso,marginBottom:20,lineHeight:1.2}}>Vivir al máximo implica cuidarse al máximo</h3>
          <p style={{fontSize:16,color:col.g600,lineHeight:1.8,marginBottom:16}}>Aura Spa es un spa exclusivo donde podrás disfrutar de un delicioso masaje relajante, revitalizante y terapéutico.</p>
          <p style={{fontSize:16,color:col.g600,lineHeight:1.8,marginBottom:28}}>Además de nuestros servicios adicionales de estética corporal, hidroterapia, spa facial, entre otros servicios que te brindarán la relajación que necesitas para quedar renovado.</p>
          <button onClick={()=>setPage("book")}style={{background:col.espresso,color:col.cream,border:"none",padding:"13px 28px",borderRadius:3,fontSize:14,fontWeight:500,cursor:"pointer",transition:"all 0.2s"}}onMouseEnter={e=>e.target.style.background=col.brown}onMouseLeave={e=>e.target.style.background=col.espresso}>Leer Más →</button>
        </div>
        <div style={{flex:"1 1 45%",minWidth:"300px",background:landingImages?.section2?`url(${landingImages.section2})`:`linear-gradient(135deg,${col.taupe} 0%,${col.sand} 100%)`,backgroundSize:"cover",backgroundPosition:"center",borderRadius:12,height:"400px",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
          {!landingImages?.section2&&<div style={{fontSize:100,opacity:0.3,position:"absolute"}}>😌</div>}
          {!landingImages?.section2&&<div style={{fontSize:80,position:"relative",zIndex:1}}>🧖‍♀️</div>}
        </div>
      </div>
    </section>

    <section style={{padding:"60px 20px",background:col.white}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <p style={{fontSize:12,color:col.brown,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:12}}>✦ Tu Dosis de Bienestar ✦</p>
          <h3 className="display"style={{fontSize:42,fontWeight:300,color:col.espresso,marginBottom:20,lineHeight:1.2}}>Galería de Inspiración</h3>
          <p style={{color:col.g600,marginBottom:28}}>Descubre la belleza y armonía que awaita en nuestro spa con cada tratamiento cuidadosamente diseñado para ti</p>
        </div>
        <Carousel images={carouselImages} title="Experiencias Aura Spa" subtitle="Renovación y Bienestar"/>
        <div style={{display:"flex",gap:16,justifyContent:"center",marginTop:32}}>
          <button onClick={()=>setPage("book")}style={{background:col.espresso,color:col.cream,border:"none",padding:"13px 28px",borderRadius:3,fontSize:14,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}>Reservar Ahora →</button>
          <button onClick={()=>setPage("services-page")}style={{background:"transparent",border:`1px solid ${col.espresso}`,color:col.espresso,padding:"13px 28px",borderRadius:3,fontSize:14,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}>Ver Más Servicios</button>
        </div>
      </div>
    </section>

    <section aria-labelledby="services-title"style={{padding:"60px 20px",flex:1}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <h2 id="services-title"className="display"style={{fontSize:36,fontWeight:300,marginBottom:8,color:col.espresso}}>{t.servicesSection.title}</h2>
          <p style={{color:col.g600}}>{t.servicesSection.sub}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20}}>
          {services.filter(s=>s.active).map((svc,i)=>(
            <Card key={svc.id}style={{padding:12,textAlign:"center",cursor:"pointer",transition:"all 0.2s",overflow:"hidden"}}className="anim-fadeup"onClick={()=>setPage("book")}role="button"tabIndex={0}onKeyDown={e=>e.key==="Enter"&&setPage("book")}aria-label={`${svc.name}, ${svc.duration} ${t.min}, ${fmt(svc.price)}`}>
              <div style={{background:col.sand,height:140,borderRadius:6,marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                {svc.image?<img src={svc.image}alt={svc.name}style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{fontSize:48}}>{EMOJI[svc.category]||"🌿"}</div>}
              </div>
              <h3 style={{fontSize:15,fontWeight:500,marginBottom:6,color:col.espresso}}>{svc.name}</h3>
              <p style={{fontSize:12,color:col.g600,marginBottom:4}}>{svc.duration} {t.min}</p>
              <p style={{fontSize:14,fontWeight:500,color:col.brown}}>{fmt(svc.price)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section style={{background:col.sand,padding:"48px 20px",textAlign:"center"}}>
      <h3 className="display"style={{fontSize:32,fontWeight:300,color:col.espresso,marginBottom:12}}>{t.hero.cta}</h3>
      <Btn style={{marginTop:8,padding:"13px 36px",fontSize:14}}onClick={()=>setPage("book")}>{t.hero.cta}</Btn>
    </section>
  </main>;
}

/* ═══════════════════════════ SERVICES PAGE ════════════════════════════ */
function ServicesPage({setPage,services}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const cats=[...new Set(services.map(s=>s.category))];
  return<main id="main-content"tabIndex={-1}style={{maxWidth:1100,margin:"0 auto",padding:"40px 20px"}}>
    <BackBtn onClick={()=>setPage("home")}/>
    <h2 className="display"style={{fontSize:38,fontWeight:300,marginBottom:8,color:col.espresso}}>{t.servicesSection.title}</h2>
    <p style={{color:col.g600,marginBottom:40}}>{t.servicesSection.sub}</p>
    {cats.map(cat=>(
      <div key={cat}style={{marginBottom:40}}>
        <h3 style={{fontSize:14,fontWeight:600,color:col.brown,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:16,borderBottom:`1px solid ${col.sand}`,paddingBottom:8}}>{t.categories[cat]||cat}</h3>
        <div style={{display:"flex",flexWrap:"nowrap",overflowX:"auto",gap:16,paddingBottom:16,scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"}}>
          {services.filter(s=>s.category===cat&&s.active).map(svc=>(
            <Card key={svc.id}style={{padding:16,cursor:"pointer",transition:"all 0.2s",flex:"0 0 280px",minWidth:"280px",overflow:"hidden",display:"flex",flexDirection:"column"}}onClick={()=>setPage("book")}role="button"tabIndex={0}onKeyDown={e=>e.key==="Enter"&&setPage("book")}>
              <div style={{background:col.sand,height:160,borderRadius:6,marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                {svc.image?<img src={svc.image}alt={svc.name}style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:48}}>{EMOJI[svc.category]||"🌿"}</span>}
              </div>
              <div><h4 style={{fontWeight:500,marginBottom:4,color:col.espresso}}>{svc.name}</h4><p style={{fontSize:12,color:col.g600}}>{svc.duration} {t.min}</p><p style={{fontSize:14,fontWeight:600,color:col.brown,marginTop:4}}>{fmt(svc.price)}</p></div>
            </Card>
          ))}
        </div>
      </div>
    ))}
  </main>;
}

/* ═══════════════════════════ CONTACT PAGE ════════════════════════════ */
function ContactPageNew({setPage,companyData}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[form,setForm]=useState({name:"",email:"",phone:"",message:""});
  const[toast,setToast]=useState(null);
  const s=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const handleSubmit=()=>{
    if(!form.name||!form.email||!form.phone||!form.message){alert("Por favor completa todos los campos");return;}
    setToast({msg:"✓ ¡Gracias! Hemos recibido tu mensaje. Nos comunicaremos contigo en las próximas 24 horas.",type:"success"});
    setForm({name:"",email:"",phone:"",message:""});
    setTimeout(()=>setToast(null),4000);
  };
  return<main id="main-content"tabIndex={-1}style={{padding:"40px 20px"}}>
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <BackBtn onClick={()=>setPage("home")}/>
      <h2 className="display"style={{fontSize:38,fontWeight:300,marginBottom:12,color:col.espresso}}>Contáctanos</h2>
      <p style={{color:col.g600,marginBottom:40,fontSize:16}}>Estamos aquí para ayudarte. Déjanos tus datos y nos comunicaremos contigo pronto.</p>
      {toast&&<Toast msg={toast.msg}type={toast.type}/>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,maxWidth:1000}}>
        <Card style={{padding:32}}>
          <h3 style={{fontSize:20,fontWeight:600,color:col.espresso,marginBottom:24}}>📍 Información de la Empresa</h3>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            <div>
              <p style={{fontSize:12,color:col.brown,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Ubicacion</p>
              <p style={{color:col.g600,lineHeight:1.6,whiteSpace:"pre-line"}}>{companyData?.address||"Cra. 5 #120-45"}</p>
            </div>
            <div>
              <p style={{fontSize:12,color:col.brown,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Telefono</p>
              <a href={"tel:"+companyData?.phone}style={{color:col.espresso,textDecoration:"none",fontWeight:500,fontSize:15}}>{companyData?.phone}</a>
            </div>
            <div>
              <p style={{fontSize:12,color:col.brown,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Correo</p>
              <a href={"mailto:"+companyData?.email}style={{color:col.espresso,textDecoration:"none",fontWeight:500,fontSize:15}}>{companyData?.email}</a>
            </div>
            <div>
              <p style={{fontSize:12,color:col.brown,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Horario</p>
              <p style={{color:col.g600,lineHeight:1.6}}>Lunes - Viernes: {companyData?.weekStart||"09:00"} - {companyData?.weekEnd||"20:00"}<br/>Sábado: {companyData?.satStart||"09:00"} - {companyData?.satEnd||"18:00"}<br/>Domingo: {companyData?.sunStart||"10:00"} - {companyData?.sunEnd||"17:00"}</p>
            </div>
            <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${col.sand}`}}>
              <p style={{fontSize:12,color:col.brown,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12}}>Síguenos</p>
              <div style={{display:"flex",gap:12}}>
                {[{icon:"📱",url:"#"},{icon:"f",url:"#"},{icon:"📷",url:"#"}].map((social,i)=><a key={i}href={social.url}style={{display:"flex",alignItems:"center",justifyContent:"center",width:40,height:40,borderRadius:8,background:col.sand,color:col.espresso,textDecoration:"none",fontSize:16,transition:"all 0.2s",cursor:"pointer",fontWeight:600}}onMouseEnter={e=>e.target.style.background=col.espresso+30}onMouseLeave={e=>e.target.style.background=col.sand}>{social.icon}</a>)}
              </div>
            </div>
          </div>
        </Card>
        <Card style={{padding:32}}>
          <h3 style={{fontSize:20,fontWeight:600,color:col.espresso,marginBottom:24}}>✉️ Envíanos un Mensaje</h3>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <Input label="Tu nombre *"value={form.name}onChange={s("name")}placeholder="¿Cómo te llamas?"/>
            <Input label="Correo electrónico *"type="email"value={form.email}onChange={s("email")}placeholder="correo@ejemplo.com"/>
            <Input label="Teléfono *"type="tel"value={form.phone}onChange={s("phone")}placeholder="+57 300 123 4567"/>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <Lbl>Mensaje *</Lbl>
              <textarea value={form.message}onChange={s("message")}rows={6}placeholder="Cuéntanos cómo podemos ayudarte. ¿Preguntas sobre nuestros servicios? ¿Deseas agendar? Estamos aquí para ti."style={{border:`1px solid ${col.sand}`,borderRadius:4,padding:"10px 14px",fontSize:14,fontFamily:"DM Sans,sans-serif",color:col.espresso,background:col.white,resize:"vertical",transition:"all 0.2s"}}onFocus={e=>e.target.style.borderColor=col.brown}onBlur={e=>e.target.style.borderColor=col.sand}/>
            </div>
            <Btn onClick={handleSubmit}style={{width:"100%",padding:"14px 0",fontSize:14,marginTop:8}}>Enviar Mensaje 📤</Btn>
            <p style={{fontSize:12,color:col.g600,textAlign:"center",marginTop:8}}>Responderemos en el menor tiempo posible</p>
          </div>
        </Card>
      </div>
    </div>
  </main>;
}

function ContactPage({setPage}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[form,setForm]=useState({name:"",email:"",phone:"",message:""});
  const[toast,setToast]=useState(null);
  const s=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const handleSubmit=()=>{
    if(!form.name||!form.email||!form.phone||!form.message){alert("Por favor completa todos los campos");return;}
    setToast({msg:"✓ Gracias! Nos comunicaremos contigo pronto.",type:"success"});
    setForm({name:"",email:"",phone:"",message:""});
    setTimeout(()=>setToast(null),3000);
  };
  return<main id="main-content"tabIndex={-1}style={{maxWidth:600,margin:"0 auto",padding:"40px 20px"}}>
    <BackBtn onClick={()=>setPage("home")}/>
    <h2 className="display"style={{fontSize:38,fontWeight:300,marginBottom:8,color:col.espresso}}>{t.about.contactTitle}</h2>
    <p style={{color:col.g600,marginBottom:28,fontSize:15}}>{t.about.contactSubtitle}</p>
    {toast&&<Toast msg={toast.msg}type={toast.type}/>}
    <Card style={{padding:32}}>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <Input label="Nombre completo"value={form.name}onChange={s("name")}placeholder="Tu nombre"/>
        <Input label="Correo electrónico"type="email"value={form.email}onChange={s("email")}placeholder="correo@ejemplo.com"/>
        <Input label="Teléfono"type="tel"value={form.phone}onChange={s("phone")}placeholder="3001234567"/>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <Lbl>Mensaje</Lbl>
          <textarea value={form.message}onChange={s("message")}rows={5}placeholder="Cuéntanos cómo podemos ayudarte..."style={{border:`1px solid ${col.sand}`,borderRadius:4,padding:"10px 14px",fontSize:14,fontFamily:"DM Sans,sans-serif",color:col.espresso,background:col.white,resize:"vertical"}}/>
        </div>
        <Btn onClick={handleSubmit}style={{width:"100%",padding:"13px 0",fontSize:14}}>Enviar mensaje</Btn>
      </div>
    </Card>
  </main>;
}

/* ═══════════════════════════ CONTACT FORM ═════════════════════════════ */
function ContactForm({setPage}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[form,setForm]=useState({name:"",email:"",phone:"",message:""});
  const[toast,setToast]=useState(null);
  const s=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const handleSubmit=()=>{
    if(!form.name||!form.email||!form.phone||!form.message){alert("Por favor completa todos los campos");return;}
    setToast({msg:"✓ Gracias! Nos comunicaremos contigo pronto.",type:"success"});
    setForm({name:"",email:"",phone:"",message:""});
    setTimeout(()=>setToast(null),3000);
  };
  return<div style={{maxWidth:600,margin:"0 auto"}}>
    {toast&&<Toast msg={toast.msg}type={toast.type}/>}
    <p style={{color:col.g600,marginBottom:24,fontSize:15}}>{t.about.contactSubtitle}</p>
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <Input label="Nombre completo"value={form.name}onChange={s("name")}placeholder="Tu nombre"/>
      <Input label="Correo electrónico"type="email"value={form.email}onChange={s("email")}placeholder="correo@ejemplo.com"/>
      <Input label="Teléfono"type="tel"value={form.phone}onChange={s("phone")}placeholder="3001234567"/>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        <Lbl>Mensaje</Lbl>
        <textarea value={form.message}onChange={s("message")}rows={4}placeholder="Cuéntanos cómo podemos ayudarte..."style={{border:`1px solid ${col.sand}`,borderRadius:4,padding:"10px 14px",fontSize:14,fontFamily:"DM Sans,sans-serif",color:col.espresso,background:col.white,resize:"vertical"}}/>
      </div>
      <Btn onClick={handleSubmit}style={{width:"100%",padding:"12px 0",fontSize:14}}>Enviar mensaje</Btn>
    </div>
  </div>;
}

/* ═══════════════════════════ ABOUT PAGE ════════════════════════════════ */
function AboutPage({setPage,initialTab}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const mainSections=[{id:"mission",label:t.about.missionTitle,icon:"🎯"},{id:"vision",label:t.about.visionTitle,icon:"🌟"},{id:"history",label:t.about.historyTitle,icon:"📖"},{id:"who",label:t.about.whoAreWeTitle,icon:"👥"},{id:"values",label:t.about.valuesTitle,icon:"💎"}];
  const policySections=[{id:"data",label:"Datos",icon:"🔒"},{id:"terms",label:"Términos",icon:"📋"},{id:"cookies",label:"Cookies",icon:"🍪"}];
  const[activeTab,setActiveTab]=useState(initialTab||"mission");
  useEffect(()=>{if(initialTab)setActiveTab(initialTab);},[initialTab]);
  const VALORES=[{icon:"🤝",name:"Integridad",description:"Actuamos con honestidad en cada interacción y respetamos la confianza."},{icon:"💚",name:"Cuidado",description:"El bienestar de nuestros clientes es el centro de todo lo que hacemos."},{icon:"✨",name:"Excelencia",description:"Buscamos constantemente mejorar nuestros servicios y capacitación."},{icon:"🌿",name:"Sostenibilidad",description:"Utilizamos productos eco-friendly y prácticas responsables."}];
  const VALORES_EN=[{icon:"🤝",name:"Integrity",description:"We act with honesty in every interaction and respect trust."},{icon:"💚",name:"Care",description:"The wellbeing of our clients is at the center of everything."},{icon:"✨",name:"Excellence",description:"We constantly seek to improve our services and training."},{icon:"🌿",name:"Sustainability",description:"We use eco-friendly products and responsible practices."}];
  const valores=t.lang==="ES"?VALORES:VALORES_EN;
  const content={mission:{title:t.about.missionTitle,text:t.about.missionText,icon:"🎯"},vision:{title:t.about.visionTitle,text:t.about.visionText,icon:"🌟"},history:{title:t.about.historyTitle,text:t.about.historyText,icon:"📖"},who:{title:t.about.whoAreWeTitle,text:t.about.whoAreWeText,icon:"👥"},values:{title:t.about.valuesTitle,icon:"💎",isValues:true},data:{title:t.about.dataTitle,text:t.about.dataText,icon:"🔒"},terms:{title:t.about.termsTitle,text:t.about.termsText,icon:"📋"},cookies:{title:t.about.cookiesTitle,text:t.about.cookiesText,icon:"🍪"}};
  const displayContent=content[activeTab];
  return<main id="main-content"tabIndex={-1}style={{padding:"40px 20px"}}>
    <BackBtn onClick={()=>setPage("home")}/>
    <h2 className="display"style={{fontSize:38,fontWeight:300,marginBottom:32,color:col.espresso}}>{t.about.title}</h2>
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <div style={{display:"flex",flexDirection:"column",gap:24}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,borderBottom:`1px solid ${col.sand}`,paddingBottom:16}}>
          <p style={{fontSize:11,color:col.g600,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:600,width:"100%"}}>Sobre nosotros</p>
          {mainSections.map(sec=><button key={sec.id}onClick={()=>setActiveTab(sec.id)}style={{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",background:activeTab===sec.id?col.espresso:"transparent",border:`2px solid ${activeTab===sec.id?col.espresso:col.sand}`,borderRadius:6,color:activeTab===sec.id?col.cream:col.g600,fontSize:13,cursor:"pointer",transition:"all 0.2s",fontFamily:"DM Sans,sans-serif",fontWeight:activeTab===sec.id?600:400}}><span style={{fontSize:14}}>{sec.icon}</span>{sec.label}</button>)}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:12}}>
          <p style={{fontSize:11,color:col.g600,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:600,width:"100%"}}>Políticas</p>
          {policySections.map(sec=><button key={sec.id}onClick={()=>setActiveTab(sec.id)}style={{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",background:activeTab===sec.id?col.espresso:"transparent",border:`2px solid ${activeTab===sec.id?col.espresso:col.sand}`,borderRadius:6,color:activeTab===sec.id?col.cream:col.g600,fontSize:13,cursor:"pointer",transition:"all 0.2s",fontFamily:"DM Sans,sans-serif",fontWeight:activeTab===sec.id?600:400}}><span style={{fontSize:14}}>{sec.icon}</span>{sec.label}</button>)}
        </div>
      </div>
      <Card key={activeTab}style={{padding:36,marginTop:24}}className="anim-scalein"role="region">
        <div style={{fontSize:40,marginBottom:20}}>{displayContent.icon}</div>
        <h3 className="display"style={{fontSize:28,fontWeight:400,marginBottom:16,color:col.espresso}}>{displayContent.title}</h3>
        {activeTab==="values"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>{valores.map((val,idx)=><Card key={idx}style={{padding:20,textAlign:"center"}}><div style={{fontSize:32,marginBottom:12}}>{val.icon}</div><h4 style={{fontWeight:600,marginBottom:8,color:col.espresso,fontSize:16}}>{val.name}</h4><p style={{fontSize:14,color:col.g600,lineHeight:1.6}}>{val.description}</p></Card>)}</div>}
        {activeTab!=="values"&&<p style={{color:col.g600,lineHeight:1.9,fontSize:15}}>{displayContent.text}</p>}
      </Card>
    </div>
  </main>;
}

/* ═══════════════════════════ AUTH SCREEN ═══════════════════════════════ */
function AuthScreen({onLogin,setPage,initMode="login",users,setUsers}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[mode,setMode]=useState(initMode);
  const[form,setForm]=useState({name:"",email:"",phone:"",password:"",confirm:""});
  const[err,setErr]=useState("");
  const[acceptData,setAcceptData]=useState(false);
  const[acceptTerms,setAcceptTerms]=useState(false);
  const s=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const login=()=>{setErr("");const u=users.find(u=>u.email===form.email&&u.password===form.password);if(!u){setErr(t.auth.wrongCreds);return;}onLogin(u);};
  const register=()=>{setErr("");if(!form.name||!form.email||!form.password){setErr(t.auth.fillAll);return;}if(form.password!==form.confirm){setErr(t.auth.pwdMismatch);return;}if(!acceptData||!acceptTerms){setErr("Debes aceptar la política de tratamiento de datos y los términos y condiciones para continuar.");return;}if(users.find(u=>u.email===form.email)){setErr(t.auth.emailUsed);return;}const u={id:Date.now(),email:form.email,password:form.password,role:"client",name:form.name,phone:form.phone,createdAt:todayStr()};setUsers(p=>[...p,u]);onLogin(u);};
  const handleKeyPress=e=>{if(e.key==="Enter"){e.preventDefault();mode==="login"?login():register();}};
  return<main id="main-content"tabIndex={-1}style={{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div className="anim-fadeup"style={{width:"100%",maxWidth:420}}>
      <BackBtn onClick={()=>setPage("home")}/>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h2 className="display"style={{fontSize:42,fontWeight:300,color:col.espresso}}>Aura</h2>
        <p style={{color:col.brown,fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase"}}>Spa & Wellness</p>
      </div>
      <Card style={{padding:32}}>
        <div style={{display:"flex",marginBottom:24,border:`1px solid ${col.sand}`,borderRadius:4,overflow:"hidden"}}role="tablist">
          {["login","register"].map(m=><button key={m}role="tab"aria-selected={mode===m}onClick={()=>{setMode(m);setErr("");}}style={{flex:1,padding:"10px 0",border:"none",fontSize:13,fontWeight:500,background:mode===m?col.espresso:"transparent",color:mode===m?col.cream:col.g600,cursor:"pointer",transition:"all 0.2s"}}>{m==="login"?t.auth.login:t.auth.register}</button>)}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}onKeyPress={handleKeyPress}>
          {mode==="register"&&<><Input label={t.auth.name}value={form.name}onChange={s("name")}placeholder="Tu nombre"/><Input label={t.auth.phone}type="tel"value={form.phone}onChange={s("phone")}placeholder="3001234567"/></>}
          <Input label={t.auth.email}type="email"value={form.email}onChange={s("email")}placeholder="correo@ejemplo.com"/>
          <Input label={t.auth.password}type="password"value={form.password}onChange={s("password")}placeholder="••••••••"/>
          {mode==="register"&&<Input label={t.auth.confirmPwd}type="password"value={form.confirm}onChange={s("confirm")}placeholder="••••••••"/>}
          {err&&<p role="alert"style={{color:"#9B1C1C",fontSize:13,background:"#FDECEA",padding:"10px 14px",borderRadius:4}}>{err}</p>}
          {mode==="register"&&<div style={{display:"flex",flexDirection:"column",gap:10,padding:"16px",background:col.sand,borderRadius:6}}>
            <label style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:13}}>
              <input type="checkbox"checked={acceptData}onChange={e=>setAcceptData(e.target.checked)}style={{marginTop:2,cursor:"pointer",width:18,height:18}}/>
              <span>Acepto el <button style={{background:"none",border:"none",color:col.espresso,fontSize:13,fontWeight:600,cursor:"pointer",textDecoration:"underline",padding:0}}onClick={e=>{e.preventDefault();setPage("about-data")}}>tratamiento de datos personales</button></span>
            </label>
            <label style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:13}}>
              <input type="checkbox"checked={acceptTerms}onChange={e=>setAcceptTerms(e.target.checked)}style={{marginTop:2,cursor:"pointer",width:18,height:18}}/>
              <span>Acepto los <button style={{background:"none",border:"none",color:col.espresso,fontSize:13,fontWeight:600,cursor:"pointer",textDecoration:"underline",padding:0}}onClick={e=>{e.preventDefault();setPage("about-terms")}}>términos y condiciones</button></span>
            </label>
          </div>}
          <Btn onClick={mode==="login"?login:register}style={{width:"100%",padding:"13px 0",fontSize:14,marginTop:4}}>{mode==="login"?t.auth.enter:t.auth.create}</Btn>
          {mode==="register"&&<>
            <div style={{display:"flex",alignItems:"center",gap:8,margin:"16px 0",opacity:0.6}}><div style={{flex:1,height:"1px",background:col.sand}}/><span style={{fontSize:12,color:col.g600}}>O regístrate con</span><div style={{flex:1,height:"1px",background:col.sand}}/></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
              <button onClick={()=>{alert("🚀 Google Sign-In está en desarrollo. Pronto podrás registrarte con tu cuenta de Google.");}}style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 0",background:col.sand,border:"none",borderRadius:4,cursor:"pointer",fontSize:12,fontFamily:"DM Sans,sans-serif",fontWeight:500,color:col.espresso,transition:"all 0.2s"}}onMouseOver={e=>e.target.style.background=col.taupe}onMouseOut={e=>e.target.style.background=col.sand}>🔵 Google</button>
              <button onClick={()=>{alert("🚀 Facebook Login está en desarrollo. Pronto podrás registrarte con tu cuenta de Facebook.");}}style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 0",background:col.sand,border:"none",borderRadius:4,cursor:"pointer",fontSize:12,fontFamily:"DM Sans,sans-serif",fontWeight:500,color:col.espresso,transition:"all 0.2s"}}onMouseOver={e=>e.target.style.background=col.taupe}onMouseOut={e=>e.target.style.background=col.sand}>📘 Facebook</button>
              <button onClick={()=>{alert("🚀 Instagram Login está en desarrollo. Pronto podrás registrarte con tu cuenta de Instagram.");}}style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 0",background:col.sand,border:"none",borderRadius:4,cursor:"pointer",fontSize:12,fontFamily:"DM Sans,sans-serif",fontWeight:500,color:col.espresso,transition:"all 0.2s"}}onMouseOver={e=>e.target.style.background=col.taupe}onMouseOut={e=>e.target.style.background=col.sand}>📷 Instagram</button>
            </div>
          </>}
          {mode==="login"&&<p style={{fontSize:11,color:col.g400,textAlign:"center",marginTop:12}}><button onClick={()=>setPage("recover-password")}style={{background:"none",border:"none",color:col.espresso,fontSize:12,cursor:"pointer",textDecoration:"underline",fontWeight:500,fontFamily:"DM Sans,sans-serif",marginBottom:8,display:"block",width:"100%"}}>{t.auth.forgotPassword}</button>{t.auth.demo}</p>}
        </div>
      </Card>
    </div>
  </main>;
}


/* ═══════════════════════════ RECOVER PASSWORD ══════════════════════════ */
function RecoverPasswordScreen({setPage,users}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[email,setEmail]=useState("");
  const[loading,setLoading]=useState(false);
  const[success,setSuccess]=useState(false);
  const[err,setErr]=useState("");

  const handleRecover=async()=>{
    setErr("");
    if(!email){setErr(t.auth.fillAll);return;}
    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){setErr("Ingresa un correo válido.");return;}
    
    setLoading(true);
    // Simular espera del servidor
    await new Promise(resolve=>setTimeout(resolve,1500));
    
    // Verificar si el correo existe en la BD
    const userExists=users.some(u=>u.email===email);
    
    if(userExists || true){// Siempre mostrar el mismo mensaje por seguridad
      // Generar token seguro (en producción, generado por el servidor)
      const token=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);
      const expiresAt=Date.now()+30*60*1000; // 30 minutos de expiración
      
      // Guardar token en localStorage
      localStorage.setItem(`pwd_reset_${token}`,JSON.stringify({email,expiresAt,used:false}));
      
      // En producción, aquí se enviaría un correo con el enlace
      // const resetLink=`${window.location.origin}/reset-password?token=${token}`;
      // sendEmail(email, resetLink);
      
      setSuccess(true);
      console.log(`[DEMO] Token generado: ${token}`);
      console.log(`[DEMO] Enlace de recuperación: /reset-password?token=${token}`);
    }
    
    setLoading(false);
  };

  const handleKeyPress=e=>{if(e.key==="Enter"&&!loading)handleRecover();};

  if(success){
    return<main id="main-content"tabIndex={-1}style={{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div className="anim-fadeup"style={{width:"100%",maxWidth:420}}>
        <BackBtn onClick={()=>setPage("home")}/>
        <Card style={{padding:32,textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>✉️</div>
          <h2 style={{fontSize:24,fontWeight:600,color:col.espresso,marginBottom:8}}>Correo Enviado</h2>
          <p style={{fontSize:14,color:col.g600,marginBottom:20}}>{t.auth.recoverSent}</p>
          <div style={{background:col.sand,padding:16,borderRadius:6,marginBottom:20,textAlign:"left",fontSize:12,color:col.g600}}>
            <p style={{fontWeight:600,marginBottom:8,color:col.espresso}}>Para demo/testing:</p>
            <p>Abre la consola del navegador (F12) para ver el token y el enlace de recuperación.  El token expira en 30 minutos.</p>
          </div>
          <Btn onClick={()=>setPage("login")}style={{width:"100%"}}>{t.auth.backToLogin}</Btn>
          <button onClick={()=>setSuccess(false)}style={{width:"100%",padding:"10px",marginTop:12,background:"transparent",border:`1px solid ${col.sand}`,borderRadius:4,color:col.espresso,fontSize:13,cursor:"pointer",fontWeight:500,fontFamily:"DM Sans,sans-serif"}}>Enviar a otro correo</button>
        </Card>
      </div>
    </main>;
  }

  return<main id="main-content"tabIndex={-1}style={{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div className="anim-fadeup"style={{width:"100%",maxWidth:420}}>
      <BackBtn onClick={()=>setPage("login")}/>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h2 className="display"style={{fontSize:42,fontWeight:300,color:col.espresso}}>Aura</h2>
        <p style={{color:col.brown,fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase"}}>Spa & Wellness</p>
      </div>
      <Card style={{padding:32}}>
        <h3 style={{fontSize:18,fontWeight:600,marginBottom:8,color:col.espresso}}>{t.auth.recoverTitle}</h3>
        <p style={{fontSize:13,color:col.g600,marginBottom:20}}>{t.auth.recoverSub}</p>
        <div style={{display:"flex",flexDirection:"column",gap:14}}onKeyPress={handleKeyPress}>
          <Input label={t.auth.email}type="email"value={email}onChange={e=>setEmail(e.target.value)}placeholder="correo@ejemplo.com"disabled={loading}/>
          {err&&<p role="alert"style={{color:"#9B1C1C",fontSize:13,background:"#FDECEA",padding:"10px 14px",borderRadius:4}}>{err}</p>}
          <Btn onClick={handleRecover}disabled={loading}style={{width:"100%",padding:"13px 0",fontSize:14}}>{loading?"Procesando...":t.auth.recoverBtn}</Btn>
          <button onClick={()=>setPage("login")}style={{width:"100%",padding:"10px",background:"transparent",border:`1px solid ${col.sand}`,borderRadius:4,color:col.espresso,fontSize:13,cursor:"pointer",fontWeight:500,fontFamily:"DM Sans,sans-serif",marginTop:8}}>{t.auth.backToLogin}</button>
        </div>
      </Card>
    </div>
  </main>;
}

/* ═══════════════════════════ RESET PASSWORD ═══════════════════════════ */
function ResetPasswordScreen({token,setPage,users,setUsers}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[pwd,setPwd]=useState({new:"",confirm:""});
  const[loading,setLoading]=useState(false);
  const[err,setErr]=useState("");
  const[success,setSuccess]=useState(false);
  const[tokenValid,setTokenValid]=useState(true);

  // Validar token al cargar
  useEffect(()=>{
    if(!token){setTokenValid(false);return;}
    const tokenData=localStorage.getItem(`pwd_reset_${token}`);
    if(!tokenData){setTokenValid(false);return;}
    try{
      const{expiresAt,used}=JSON.parse(tokenData);
      if(Date.now()>expiresAt){setTokenValid(false);return;}
      if(used){setTokenValid(false);return;}
    }catch{
      setTokenValid(false);
    }
  },[token]);

  const validatePassword=password=>{
    if(!password||password.length<8)return"Mínimo 8 caracteres";
    if(!/[a-zA-Z]/.test(password))return"Debe contener letras";
    if(!/[0-9]/.test(password))return"Debe contener números";
    return null;
  };

  const handleReset=async()=>{
    setErr("");
    
    if(!pwd.new||!pwd.confirm){setErr(t.auth.fillAll);return;}
    if(pwd.new!==pwd.confirm){setErr(t.auth.pwdMismatch);return;}
    
    const pwdErr=validatePassword(pwd.new);
    if(pwdErr){setErr(pwdErr);return;}
    
    setLoading(true);
    // Simular espera del servidor
    await new Promise(resolve=>setTimeout(resolve,1500));
    
    // Obtener datos del token
    const tokenData=localStorage.getItem(`pwd_reset_${token}`);
    const{email}=JSON.parse(tokenData);
    
    // Actualizar contraseña del usuario
    const updatedUsers=users.map(u=>
      u.email===email?{...u,password:pwd.new}:u
    );
    setUsers(updatedUsers);
    
    // Marcar token como usado
    const data=JSON.parse(tokenData);
    localStorage.setItem(`pwd_reset_${token}`,JSON.stringify({...data,used:true}));
    
    setLoading(false);
    setSuccess(true);
  };

  const handleKeyPress=e=>{if(e.key==="Enter"&&!loading)handleReset();};

  if(!tokenValid){
    return<main id="main-content"tabIndex={-1}style={{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div className="anim-fadeup"style={{width:"100%",maxWidth:420}}>
        <Card style={{padding:32,textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>⏰</div>
          <h2 style={{fontSize:24,fontWeight:600,color:"#9B1C1C",marginBottom:8}}>Enlace Expirado</h2>
          <p style={{fontSize:14,color:col.g600,marginBottom:20}}>{t.auth.invalidToken}</p>
          <Btn onClick={()=>setPage("recover-password")}style={{width:"100%"}}>Solicitar Nuevo Enlace</Btn>
        </Card>
      </div>
    </main>;
  }

  if(success){
    return<main id="main-content"tabIndex={-1}style={{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div className="anim-fadeup"style={{width:"100%",maxWidth:420}}>
        <Card style={{padding:32,textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>✓</div>
          <h2 style={{fontSize:24,fontWeight:600,color:C.sage,marginBottom:8}}>Contraseña Actualizada</h2>
          <p style={{fontSize:14,color:col.g600,marginBottom:20}}>Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.</p>
          <Btn onClick={()=>setPage("login")}style={{width:"100%"}}>{t.auth.backToLogin}</Btn>
        </Card>
      </div>
    </main>;
  }

  return<main id="main-content"tabIndex={-1}style={{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div className="anim-fadeup"style={{width:"100%",maxWidth:420}}>
      <BackBtn onClick={()=>setPage("login")}/>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h2 className="display"style={{fontSize:42,fontWeight:300,color:col.espresso}}>Aura</h2>
        <p style={{color:col.brown,fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase"}}>Spa & Wellness</p>
      </div>
      <Card style={{padding:32}}>
        <h3 style={{fontSize:18,fontWeight:600,marginBottom:8,color:col.espresso}}>{t.auth.resetTitle}</h3>
        <p style={{fontSize:13,color:col.g600,marginBottom:20}}>{t.auth.resetSub}</p>
        <div style={{display:"flex",flexDirection:"column",gap:14}}onKeyPress={handleKeyPress}>
          <Input label={t.auth.newPassword}type="password"value={pwd.new}onChange={e=>setPwd(p=>({...p,new:e.target.value}))}placeholder="••••••••"disabled={loading}/>
          <Input label={t.auth.confirmPassword}type="password"value={pwd.confirm}onChange={e=>setPwd(p=>({...p,confirm:e.target.value}))}placeholder="••••••••"disabled={loading}/>
          {err&&<p role="alert"style={{color:"#9B1C1C",fontSize:13,background:"#FDECEA",padding:"10px 14px",borderRadius:4}}>{err}</p>}
          <div style={{background:col.sand,padding:12,borderRadius:6,fontSize:12,color:col.g600}}>
            <p style={{fontWeight:600,marginBottom:6}}>Requisitos de seguridad:</p>
            <ul style={{marginLeft:16,color:pwd.new.length>=8?"#1E7E34":col.g600}}><li>✓ {pwd.new.length}≥8 caracteres</li></ul>
            <ul style={{marginLeft:16,color:/[a-zA-Z]/.test(pwd.new)?"#1E7E34":col.g600}}><li>✓ Contiene letras</li></ul>
            <ul style={{marginLeft:16,color:/[0-9]/.test(pwd.new)?"#1E7E34":col.g600}}><li>✓ Contiene números</li></ul>
          </div>
          <Btn onClick={handleReset}disabled={loading}style={{width:"100%",padding:"13px 0",fontSize:14}}>{loading?"Procesando...":t.auth.resetBtn}</Btn>
          <button onClick={()=>setPage("login")}style={{width:"100%",padding:"10px",background:"transparent",border:`1px solid ${col.sand}`,borderRadius:4,color:col.espresso,fontSize:13,cursor:"pointer",fontWeight:500,fontFamily:"DM Sans,sans-serif",marginTop:8}}>{t.auth.backToLogin}</button>
        </div>
      </Card>
    </div>
  </main>;
}

/* ═══════════════════════════ PROFILE PAGE ══════════════════════════════ */
function ProfilePage({user,setUser,appointments,users,setUsers,setPage}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[editing,setEditing]=useState(false);
  const[pwdOpen,setPwdOpen]=useState(false);
  const[form,setForm]=useState({name:user.name,email:user.email,phone:user.phone||""});
  const[pwd,setPwd]=useState({current:"",new:"",confirm:""});
  const[toast,setToast]=useState(null);
  const myApts=appointments.filter(a=>a.clientEmail===user.email);
  const attended=myApts.filter(a=>a.status==="attended").length;
  const s=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const sp=k=>e=>setPwd(f=>({...f,[k]:e.target.value}));

  const showToast=(msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),3000);};

  const saveProfile=()=>{
    if(!form.name||!form.email){showToast(t.auth.fillAll,"error");return;}
    const updated={...user,...form};
    setUser(updated);setUsers(p=>p.map(u=>u.id===user.id?{...u,...form}:u));
    setEditing(false);showToast(t.profile.profileUpdated);
  };

  const changePwd=()=>{
    if(pwd.current!==user.password){showToast(t.profile.pwdWrong,"error");return;}
    if(pwd.new!==pwd.confirm){showToast(t.profile.pwdMismatch,"error");return;}
    if(!pwd.new){showToast(t.auth.fillAll,"error");return;}
    setUser({...user,password:pwd.new});setUsers(p=>p.map(u=>u.id===user.id?{...u,password:pwd.new}:u));
    setPwdOpen(false);setPwd({current:"",new:"",confirm:""});showToast(t.profile.pwdChanged);
  };

  const roleLabel={admin:t.profile.roleAdmin,client:t.profile.roleClient,professional:t.profile.roleProfessional}[user.role]||user.role;

  return<main id="main-content"tabIndex={-1}style={{maxWidth:900,margin:"0 auto",padding:"40px 20px"}}>
    <BackBtn onClick={()=>setPage(user.role==="admin"?"admin":"home")}/>
    {toast&&<Toast msg={toast.msg}type={toast.type}/>}

    {/* Header card */}
    <Card style={{padding:32,marginBottom:24}}>
      <div style={{display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"}}>
        <Avatar name={user.name}size={80}role={user.role}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:8}}>
            <h2 className="display"style={{fontSize:28,fontWeight:400,color:col.espresso}}>{user.name}</h2>
            <RoleBadge role={user.role}/>
          </div>
          <p style={{fontSize:14,color:col.g600,marginBottom:4}}>{user.email}</p>
          {user.phone&&<p style={{fontSize:14,color:col.g600,marginBottom:4}}>📞 {user.phone}</p>}
          <p style={{fontSize:12,color:col.g400}}>{t.profile.memberSince}: {user.createdAt||"2024"}</p>
        </div>
        {!editing&&<Btn variant="secondary"onClick={()=>setEditing(true)}>{t.profile.editProfile}</Btn>}
      </div>

      {/* Stats for clients */}
      {user.role==="client"&&!editing&&(
        <div style={{display:"flex",gap:16,marginTop:24,flexWrap:"wrap"}}>
          {[[t.profile.totalApts,myApts.length,col.brown],[t.profile.attendedApts,attended,C.sage]].map(([lbl,val,clr])=>(
            <div key={lbl}style={{flex:"1 1 120px",background:col.g100,borderRadius:8,padding:"16px 20px",textAlign:"center"}}>
              <p className="display"style={{fontSize:32,fontWeight:300,color:clr,lineHeight:1}}>{val}</p>
              <p style={{fontSize:12,color:col.g600,marginTop:4}}>{lbl}</p>
            </div>
          ))}
        </div>
      )}
    </Card>

    {/* Edit form */}
    {editing&&(
      <Card style={{padding:28,marginBottom:24}}className="anim-scalein">
        <h3 style={{fontWeight:500,marginBottom:20,color:col.espresso}}>{t.profile.editProfile}</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
          <Input label={t.profile.name}value={form.name}onChange={s("name")}/>
          <Input label={t.profile.emailLbl}type="email"value={form.email}onChange={s("email")}/>
          <Input label={t.profile.phoneLbl}type="tel"value={form.phone}onChange={s("phone")}/>
        </div>
        <div style={{display:"flex",gap:12,marginTop:20}}>
          <Btn variant="secondary"onClick={()=>setEditing(false)}>{t.profile.cancel}</Btn>
          <Btn onClick={saveProfile}>{t.profile.saveChanges}</Btn>
        </div>
      </Card>
    )}

    {/* Change password */}
    <Card style={{padding:28,marginBottom:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h3 style={{fontWeight:500,color:col.espresso,marginBottom:4}}>{t.profile.changePassword}</h3>
          <p style={{fontSize:13,color:col.g600}}>••••••••</p>
        </div>
        <Btn variant="secondary"onClick={()=>setPwdOpen(o=>!o)}>{pwdOpen?t.profile.cancel:t.profile.changePassword}</Btn>
      </div>
      {pwdOpen&&(
        <div className="anim-fadeup"style={{marginTop:20,display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
          <Input label={t.profile.currentPwd}type="password"value={pwd.current}onChange={sp("current")}placeholder="••••••••"/>
          <Input label={t.profile.newPwd}type="password"value={pwd.new}onChange={sp("new")}placeholder="••••••••"/>
          <Input label={t.profile.confirmNewPwd}type="password"value={pwd.confirm}onChange={sp("confirm")}placeholder="••••••••"/>
          <div style={{display:"flex",gap:12,alignItems:"flex-end"}}>
            <Btn onClick={changePwd}>{t.profile.saveChanges}</Btn>
          </div>
        </div>
      )}
    </Card>

    {/* Admin: User Management section */}
    {user.role==="admin"&&<UserManagement currentUser={user}users={users}setUsers={setUsers}showToast={showToast}/>}
  </main>;
}

/* ═══════════════════════════ USER MANAGEMENT ════════════════════════════ */
function UserManagement({currentUser,users,setUsers,showToast}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[filter,setFilter]=useState("all");
  const[search,setSearch]=useState("");
  const[modal,setModal]=useState(null);
  const[deleteTarget,setDeleteTarget]=useState(null);

  const filtered=users.filter(u=>{
    const matchRole=filter==="all"||u.role===filter;
    const matchSearch=!search||u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole&&matchSearch;
  });

  const handleSave=(userData)=>{
    if(userData.id){
      // edit
      setUsers(p=>p.map(u=>u.id===userData.id?{...u,...userData}:u));
      if(userData.id===currentUser.id){/* could update currentUser too */}
    } else {
      // new
      if(users.find(u=>u.email===userData.email)){showToast(t.profile.userExists,"error");return;}
      setUsers(p=>[...p,{...userData,id:Date.now(),createdAt:todayStr()}]);
    }
    showToast(t.profile.userSaved);setModal(null);
  };

  const handleDelete=(u)=>{
    if(u.id===currentUser.id){showToast(t.profile.cantDeleteSelf,"error");setDeleteTarget(null);return;}
    const admins=users.filter(x=>x.role==="admin");
    if(u.role==="admin"&&admins.length<=1){showToast(t.profile.cantDeleteLast,"error");setDeleteTarget(null);return;}
    setUsers(p=>p.filter(x=>x.id!==u.id));setDeleteTarget(null);
  };

  return<>
    <Card style={{padding:28}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:20}}>
        <div>
          <h3 style={{fontSize:20,fontWeight:500,color:col.espresso,marginBottom:4}}>{t.profile.usersTitle}</h3>
          <p style={{fontSize:13,color:col.g600}}>{users.length} {t.profile.usersCount}</p>
        </div>
        <Btn onClick={()=>setModal({type:"form",data:null})}>{t.profile.newUser}</Btn>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
        {["all","admin","client","professional"].map(r=>(
          <button key={r}onClick={()=>setFilter(r)}aria-pressed={filter===r}style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${filter===r?col.brown:col.sand}`,background:filter===r?col.espresso:"transparent",color:filter===r?col.cream:col.g600,fontSize:12,cursor:"pointer",transition:"all 0.15s",fontFamily:"DM Sans,sans-serif"}}>
            {r==="all"?t.profile.allRoles:{admin:t.profile.roleAdmin,client:t.profile.roleClient,professional:t.profile.roleProfessional}[r]}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{position:"relative",marginBottom:20}}>
        <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:col.g400}}>🔍</span>
        <input value={search}onChange={e=>setSearch(e.target.value)}placeholder={t.profile.searchUser}
          style={{border:`1px solid ${col.sand}`,borderRadius:4,padding:"9px 14px 9px 36px",fontSize:14,width:"100%",background:col.white,color:col.espresso}}/>
      </div>

      {/* Table */}
      {filtered.length===0
        ?<p style={{color:col.g400,textAlign:"center",padding:24}}>{t.profile.noUsers}</p>
        :<div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(u=>(
            <div key={u.id}style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",border:`1px solid ${col.sand}`,borderRadius:8,background:col.white,flexWrap:"wrap"}}>
              <Avatar name={u.name}size={42}role={u.role}/>
              <div style={{flex:1,minWidth:160}}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:2}}>
                  <p style={{fontWeight:500,fontSize:14,color:col.espresso}}>{u.name}</p>
                  {u.id===currentUser.id&&<span style={{fontSize:10,background:col.sand,padding:"1px 8px",borderRadius:10,color:col.brown}}>Tú</span>}
                </div>
                <p style={{fontSize:12,color:col.g600}}>{u.email}{u.phone?` · ${u.phone}`:""}</p>
                <p style={{fontSize:11,color:col.g400}}>Desde {u.createdAt||"2024"}</p>
              </div>
              <RoleBadge role={u.role}/>
              <div style={{display:"flex",gap:6}}>
                <Btn variant="secondary"style={{fontSize:12,padding:"6px 12px"}}onClick={()=>setModal({type:"form",data:u})}>{t.profile.editUser}</Btn>
                <Btn variant="danger"style={{fontSize:12,padding:"6px 12px"}}onClick={()=>setDeleteTarget(u)}>{t.profile.deleteUser}</Btn>
              </div>
            </div>
          ))}
        </div>
      }
    </Card>

    {modal?.type==="form"&&<UserFormModal data={modal.data}onClose={()=>setModal(null)}onSave={handleSave}/>}
    {deleteTarget&&<Modal title={t.profile.confirmDelete}onClose={()=>setDeleteTarget(null)}>
      <p style={{color:cc(false).g600,marginBottom:24}}>{t.profile.confirmDeleteBody}</p>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:16}}>
        <Avatar name={deleteTarget.name}size={36}role={deleteTarget.role}/>
        <div><p style={{fontWeight:500}}>{deleteTarget.name}</p><p style={{fontSize:13,color:cc(false).g600}}>{deleteTarget.email}</p></div>
      </div>
      <div style={{display:"flex",gap:12}}>
        <Btn variant="secondary"onClick={()=>setDeleteTarget(null)}>{t.profile.no}</Btn>
        <Btn variant="danger"onClick={()=>handleDelete(deleteTarget)}>{t.profile.yes}</Btn>
      </div>
    </Modal>}
  </>;
}

/* ═══════════════════════════ USER FORM MODAL ════════════════════════════ */
function UserFormModal({data,onClose,onSave}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const isEdit=!!data;
  const[form,setForm]=useState({name:data?.name||"",email:data?.email||"",phone:data?.phone||"",password:data?.password||"",role:data?.role||"client"});
  const[err,setErr]=useState("");
  const s=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const save=()=>{
    if(!form.name||!form.email||!form.password){setErr(t.auth.fillAll);return;}
    onSave(isEdit?{...form,id:data.id}:form);
  };
  return<Modal title={isEdit?t.profile.editUser:t.profile.newUser.replace("+ ","")}onClose={onClose}>
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* Avatar preview */}
      <div style={{display:"flex",alignItems:"center",gap:16,padding:"16px",background:col.g100,borderRadius:8}}>
        <Avatar name={form.name||"?"} size={52} role={form.role}/>
        <div>
          <p style={{fontWeight:500,fontSize:15,color:col.espresso}}>{form.name||"Nuevo usuario"}</p>
          <RoleBadge role={form.role}/>
        </div>
      </div>
      <Input label={t.profile.name}value={form.name}onChange={s("name")}placeholder="Nombre completo"/>
      <Input label={t.profile.emailLbl}type="email"value={form.email}onChange={s("email")}placeholder="correo@ejemplo.com"/>
      <Input label={t.profile.phoneLbl}type="tel"value={form.phone}onChange={s("phone")}placeholder="3001234567"/>
      <Input label={t.profile.passwordLbl}type="password"value={form.password}onChange={s("password")}placeholder="••••••••"/>
      <Sel label={t.profile.roleAssigned}value={form.role}onChange={s("role")}>
        <option value="client">{t.profile.roleClient}</option>
        <option value="admin">{t.profile.roleAdmin}</option>
        <option value="professional">{t.profile.roleProfessional}</option>
      </Sel>
      {err&&<p role="alert"style={{color:"#9B1C1C",fontSize:13,background:"#FDECEA",padding:"10px 14px",borderRadius:4}}>{err}</p>}
      <div style={{display:"flex",gap:12,marginTop:4}}>
        <Btn variant="secondary"onClick={onClose}>{t.profile.cancel}</Btn>
        <Btn onClick={save}>{t.profile.saveChanges}</Btn>
      </div>
    </div>
  </Modal>;
}

/* ═══════════════════════════ BOOKING FLOW ══════════════════════════════ */
function BookingFlow({user,appointments,setAppointments,services,professionals,setPage}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[step,setStep]=useState(0);
  const[sel,setSel]=useState({serviceId:null,professionalId:null,date:"",time:""});
  const selSvc=services.find(s=>s.id===sel.serviceId);
  const selPro=professionals.find(p=>p.id===sel.professionalId);
  const slots=useMemo(()=>{if(!sel.serviceId||!sel.professionalId||!sel.date)return[];return getSlots(sel.serviceId,sel.professionalId,sel.date,appointments,services,professionals);},[sel,appointments,services,professionals]);
  const confirm=()=>{const apt={id:Date.now(),clientName:user.name,clientEmail:user.email,clientPhone:user.phone||"",serviceId:sel.serviceId,professionalId:sel.professionalId,date:sel.date,time:sel.time,status:"confirmed",notes:"",history:[{action:"Creada por cliente",at:new Date().toLocaleString("es-CO")}]};setAppointments(p=>[...p,apt]);setStep(3);};
  return<main id="main-content"tabIndex={-1}style={{maxWidth:720,margin:"0 auto",padding:"40px 16px"}}>
    <div aria-label="Pasos"style={{display:"flex",gap:0,marginBottom:32,borderRadius:4,overflow:"hidden",border:`1px solid ${col.sand}`}}>
      {[t.booking.selectService,t.booking.selectSchedule,t.booking.confirm].map((s,i)=>(
        <div key={i}style={{flex:1,padding:"10px 0",textAlign:"center",fontSize:12,background:step===i?col.espresso:step>i?C.sage:"transparent",color:step===i||step>i?C.white:col.g400,borderRight:`1px solid ${col.sand}`,fontWeight:step===i?500:400,transition:"all 0.3s"}}>
          {step>i?"✓ ":""}{s}
        </div>
      ))}
    </div>
    {step===0&&<div className="anim-fadeup">
      <BackBtn onClick={()=>setPage("home")}/>
      <h2 className="display"style={{fontSize:34,fontWeight:300,marginBottom:8,color:col.espresso}}>{t.booking.selectService}</h2>
      <p style={{color:col.g600,marginBottom:28}}>{t.booking.selectServiceSub}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
        {services.filter(s=>s.active).map(svc=>(
          <Card key={svc.id}style={{padding:20,cursor:"pointer",transition:"all 0.2s",border:`1px solid ${sel.serviceId===svc.id?col.brown:col.sand}`,background:sel.serviceId===svc.id?"#FDF8F4":col.white}}onClick={()=>setSel({serviceId:svc.id,professionalId:null,date:"",time:""})}role="button"tabIndex={0}onKeyDown={e=>e.key==="Enter"&&setSel({serviceId:svc.id,professionalId:null,date:"",time:""})}aria-pressed={sel.serviceId===svc.id}>
            <div style={{width:42,height:42,borderRadius:"50%",background:col.sand,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:12}}>{EMOJI[svc.category]||"🌿"}</div>
            <h3 style={{fontSize:15,fontWeight:500,marginBottom:4,color:col.espresso}}>{svc.name}</h3>
            <p style={{fontSize:12,color:col.g600}}>{svc.duration} {t.min} · {fmt(svc.price)}</p>
            {sel.serviceId===svc.id&&<p style={{fontSize:11,color:col.brown,marginTop:6,fontWeight:500}}>✓ Seleccionado</p>}
          </Card>
        ))}
      </div>
      <div style={{marginTop:28}}><Btn onClick={()=>sel.serviceId&&setStep(1)}style={{opacity:sel.serviceId?1:0.4}}aria-disabled={!sel.serviceId}>{t.booking.continue}</Btn></div>
    </div>}
    {step===1&&selSvc&&<div className="anim-fadeup">
      <BackBtn onClick={()=>setStep(0)}/>
      <h2 className="display"style={{fontSize:34,fontWeight:300,marginBottom:8,color:col.espresso}}>{selSvc.name}</h2>
      <p style={{color:col.g600,marginBottom:28}}>{t.booking.selectScheduleSub}</p>
      <Card style={{padding:24}}>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <Sel label={t.booking.professional}value={sel.professionalId||""}onChange={e=>setSel(s=>({...s,professionalId:Number(e.target.value),date:"",time:""}))}>
            <option value="">{t.booking.selectPro}</option>
            {professionals.filter(p=>p.active).map(p=><option key={p.id}value={p.id}>{p.name} — {p.specialty}</option>)}
          </Sel>
          {sel.professionalId&&<Input label={t.booking.date}type="date"value={sel.date}min={todayStr()}onChange={e=>setSel(s=>({...s,date:e.target.value,time:""}))}/>}
          {sel.date&&sel.professionalId&&<fieldset style={{border:"none",padding:0}}>
            <legend style={{fontSize:12,fontWeight:500,color:col.brown,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:10}}>{t.booking.availableSlots}</legend>
            {slots.length===0?<p style={{color:col.g400,fontSize:14}}>{t.booking.noSlots}</p>:<div style={{display:"flex",flexWrap:"wrap",gap:8}}>{slots.map(sl=><button key={sl}onClick={()=>setSel(s=>({...s,time:sl}))}aria-pressed={sel.time===sl}style={{padding:"8px 16px",borderRadius:3,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all 0.15s",border:`1px solid ${sel.time===sl?col.brown:col.sand}`,background:sel.time===sl?col.espresso:col.white,color:sel.time===sl?col.cream:col.espresso}}>{sl}</button>)}</div>}
          </fieldset>}
        </div>
      </Card>
      <div style={{marginTop:24}}><Btn onClick={()=>sel.time&&setStep(2)}style={{opacity:sel.time?1:0.4}}aria-disabled={!sel.time}>{t.booking.continue}</Btn></div>
    </div>}
    {step===2&&<div className="anim-fadeup">
      <BackBtn onClick={()=>setStep(1)}/>
      <h2 className="display"style={{fontSize:34,fontWeight:300,marginBottom:8,color:col.espresso}}>{t.booking.confirm}</h2>
      <p style={{color:col.g600,marginBottom:28}}>{t.booking.confirmSub}</p>
      <Card style={{padding:28}}>
        <dl>{[["Servicio",selSvc?.name],["Duración",`${selSvc?.duration} ${t.min}`],["Valor",fmt(selSvc?.price||0)],[t.booking.professional,selPro?.name],["Fecha",fmtD(sel.date)],["Hora",sel.time],["Cliente",user.name]].map(([k,v])=><div key={k}style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${col.sand}`}}><dt style={{fontSize:13,color:col.g600}}>{k}</dt><dd style={{fontSize:13,fontWeight:500,color:col.espresso}}>{v}</dd></div>)}</dl>
        <div style={{display:"flex",gap:12,marginTop:24}}><Btn variant="secondary"onClick={()=>setStep(1)}>{t.booking.modify}</Btn><Btn onClick={confirm}>{t.booking.confirmBtn}</Btn></div>
      </Card>
    </div>}
    {step===3&&<div className="anim-scalein"style={{textAlign:"center",padding:"60px 20px"}}>
      <div style={{fontSize:56,marginBottom:20}}>✅</div>
      <h2 className="display"style={{fontSize:38,fontWeight:300,marginBottom:12,color:col.espresso}}>{t.booking.success}</h2>
      <p style={{color:col.g600,marginBottom:6}}>{t.booking.successSub}</p>
      <p style={{color:col.g400,fontSize:13,marginBottom:32}}>{selSvc?.name} · {sel.date} · {sel.time}</p>
      <div style={{display:"flex",gap:12,justifyContent:"center"}}><Btn onClick={()=>{setStep(0);setSel({serviceId:null,professionalId:null,date:"",time:""});}}>{t.booking.newBook}</Btn><Btn variant="secondary"onClick={()=>setPage("history")}>{t.booking.viewApts}</Btn></div>
    </div>}
  </main>;
}

/* ═══════════════════════════ HISTORY PAGE ══════════════════════════════ */
function HistoryPage({user,appointments,setAppointments,services,professionals,setPage}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[cancelId,setCancelId]=useState(null);
  const myApts=useMemo(()=>appointments.filter(a=>a.clientEmail===user.email),[appointments,user.email]);
  return<main id="main-content"tabIndex={-1}style={{maxWidth:720,margin:"0 auto",padding:"40px 16px"}}>
    <BackBtn onClick={()=>setPage("home")}/>
    <h2 className="display"style={{fontSize:34,fontWeight:300,marginBottom:8,color:col.espresso}}>{t.history.title}</h2>
    <p style={{color:col.g600,marginBottom:28}}>{t.history.sub}</p>
    {myApts.length===0?<Card style={{padding:40,textAlign:"center"}}><p style={{color:col.g400}}>{t.history.empty}</p><Btn style={{marginTop:16}}onClick={()=>setPage("book")}>{t.history.firstBook}</Btn></Card>
    :<div style={{display:"flex",flexDirection:"column",gap:12}}>{myApts.sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time)).map(apt=>{const svc=services.find(s=>s.id===apt.serviceId);const pro=professionals.find(p=>p.id===apt.professionalId);return<Card key={apt.id}style={{padding:20}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}><div><h3 style={{fontWeight:500,marginBottom:4,color:col.espresso}}>{svc?.name}</h3><p style={{fontSize:13,color:col.g600}}>{pro?.name} · {fmtD(apt.date)} · {apt.time}</p></div><div style={{display:"flex",gap:8,alignItems:"center"}}><Tag status={apt.status}/>{apt.status==="confirmed"&&<Btn variant="danger"style={{fontSize:12,padding:"4px 12px"}}onClick={()=>setCancelId(apt.id)}>Cancelar</Btn>}</div></div></Card>;})}
    </div>}
    {cancelId&&<Modal title={t.cancelModal.title}onClose={()=>setCancelId(null)}><p style={{color:col.g600,marginBottom:24}}>{t.cancelModal.body}</p><div style={{display:"flex",gap:12}}><Btn variant="secondary"onClick={()=>setCancelId(null)}>{t.cancelModal.no}</Btn><Btn variant="danger"onClick={()=>{setAppointments(p=>p.map(a=>a.id===cancelId?{...a,status:"cancelled"}:a));setCancelId(null);}}>{t.cancelModal.yes}</Btn></div></Modal>}
  </main>;
}

/* ═══════════════════════════ ADMIN PORTAL ══════════════════════════════ */
function AdminPortal({user,appointments,setAppointments,services,setServices,professionals,setProfessionals,users,setUsers,setPage,companyData,setCompanyData,spLogo,setSpLogo,landingImages,setLandingImages,carouselImages,setCarouselImages}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const canvasRef1=useRef(null);const canvasRef2=useRef(null);
  const[sec,setSec]=useState("dashboard");
  const[configTab,setConfigTab]=useState("general");
  const[editService,setEditService]=useState(null);
  const[editProf,setEditProf]=useState(null);
  const[imgToast,setImgToast]=useState(null);
  const compressImage=(file,maxWidth=600,quality=0.75)=>new Promise(resolve=>{const reader=new FileReader();reader.onload=e=>{const img=new Image();img.onload=()=>{const canvas=document.createElement("canvas");let w=img.width,h=img.height;if(w>maxWidth){h=h*(maxWidth/w);w=maxWidth;}canvas.width=w;canvas.height=h;const ctx=canvas.getContext("2d");ctx.drawImage(img,0,0,w,h);resolve(canvas.toDataURL("image/jpeg",quality))};img.src=e.target.result};reader.readAsDataURL(file)});
  const[editInv,setEditInv]=useState(null);
  const[editUser,setEditUser]=useState(null);
  const[inventory,setInventory]=useState([{id:1,name:"Aceite Almendra",stock:50,min:10,provider:"Distribuidor A"},{id:2,name:"Crema Facial",stock:30,min:5,provider:"Distribuidor B"}]);
  const[payConfig,setPayConfig]=useState({iva:19,discount:30,numFactura:1000});
  const[notifConfig,setNotifConfig]=useState({emailConfirm:true,emailReminder:true,whatsapp:false,template:"Hola {cliente}, tu cita es el {fecha} a las {hora}"});
  const[agendaConfig,setAgendaConfig]=useState({interval:60,rest:15,capacity:3,cancel:2});
  const[modal,setModal]=useState(null);
  const[filter,setFilter]=useState("all");
  const today2=todayStr();
  const todayApts=appointments.filter(a=>a.date===today2);
  const stats={todayTotal:todayApts.length,confirmed:appointments.filter(a=>a.status==="confirmed").length,pending:appointments.filter(a=>a.status==="pending").length,attended:appointments.filter(a=>a.status==="attended").length,cancelled:appointments.filter(a=>a.status==="cancelled").length};

  // Draw charts
  useEffect(()=>{
    if(sec!=="dashboard")return;
    // Chart 1: Appointments by status (Pie)
    if(canvasRef1.current){
      const ctx=canvasRef1.current.getContext("2d");const scale=2;
      canvasRef1.current.width=300*scale;canvasRef1.current.height=200*scale;ctx.scale(scale,scale);
      const data=[stats.confirmed,stats.pending,stats.attended,stats.cancelled];
      const colors=[C.sage,C.gold,"#3730A3","#9B1C1C"];const labels=[t.admin.confirmed,t.admin.pending,t.admin.attended,t.admin.cancelled];
      const total=data.reduce((a,b)=>a+b,0)||1;let angle=0;
      ctx.clearRect(0,0,300,200);
      data.forEach((val,idx)=>{const sliceAngle=2*Math.PI*(val/total);ctx.fillStyle=colors[idx];ctx.beginPath();ctx.moveTo(80,80);ctx.arc(80,80,50,angle,angle+sliceAngle);ctx.closePath();ctx.fill();ctx.strokeStyle="#FAF7F2";ctx.lineWidth=2;ctx.stroke();angle+=sliceAngle;});
      // Legend
      labels.forEach((lbl,idx)=>{ctx.fillStyle=colors[idx];ctx.fillRect(150,30+idx*35,12,12);ctx.fillStyle=col.espresso;ctx.font="11px DM Sans";ctx.fillText(`${lbl} (${data[idx]})`,170,40+idx*35);});
    }
    // Chart 2: Top services (Bar)
    if(canvasRef2.current){
      const ctx=canvasRef2.current.getContext("2d");const scale=2;
      canvasRef2.current.width=300*scale;canvasRef2.current.height=200*scale;ctx.scale(scale,scale);
      const svcCounts={};appointments.forEach(a=>{if(a.status!=="cancelled")svcCounts[a.serviceId]=(svcCounts[a.serviceId]||0)+1;});
      const topSvcs=Object.entries(svcCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
      const maxCount=Math.max(...topSvcs.map(x=>x[1]),0)||1;
      ctx.clearRect(0,0,300,200);
      topSvcs.forEach((entry,idx)=>{const[svcId,cnt]=entry;const svc=services.find(s=>s.id==Number(svcId));const barHeight=120*(cnt/maxCount);const x=20+idx*50;const y=140-barHeight;
        ctx.fillStyle=C.brown;ctx.fillRect(x,y,35,barHeight);ctx.fillStyle=col.espresso;ctx.font="10px DM Sans";const svcName=svc?.name?.substring(0,8)||"-";ctx.fillText(svcName,x-5,160);ctx.fillText(cnt,x+8,y-5);
      });
      // Y-axis
      ctx.strokeStyle=col.sand;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(10,20);ctx.lineTo(10,140);ctx.stroke();
    }
  },[sec,appointments,services,stats]);
  const nav=[{id:"dashboard",label:t.admin.summary,icon:"📊"},{id:"appointments",label:t.admin.appointments,icon:"📅"},{id:"services",label:t.admin.services,icon:"✨"},{id:"professionals",label:t.admin.professionals,icon:"👩"},{id:"config",label:"Configuración",icon:"⚙️"}];
  const updateStatus=(id,status,notes="")=>{setAppointments(p=>p.map(a=>a.id===id?{...a,status,notes:notes||a.notes,history:[...(a.history||[]),{action:t.status[status],at:new Date().toLocaleString("es-CO")}]}:a));setModal(null);};
  const doReschedule=(id,date,time)=>{setAppointments(p=>p.map(a=>a.id===id?{...a,date,time,status:"rescheduled",history:[...(a.history||[]),{action:`Reprogramada a ${date} ${time}`,at:new Date().toLocaleString("es-CO")}]}:a));setModal(null);};
  const filteredApts=filter==="all"?appointments:appointments.filter(a=>a.status===filter);
  return<div style={{display:"flex",width:"100%",height:"100%"}}>
    <aside aria-label="Panel de navegación"style={{width:220,background:col.espresso,display:"flex",flexDirection:"column",position:"relative",height:"100%",padding:"24px 0",flexShrink:0,overflowY:"auto"}}>
      <div style={{padding:"0 20px 24px",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        <button onClick={()=>setPage("home")}style={{background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:0,display:"flex",alignItems:"center",gap:10}}>
          {spLogo?<img src={spLogo}alt="Aura Spa Logo"style={{width:40,height:40,borderRadius:4,objectFit:"cover"}}/>:<p className="display"style={{fontSize:22,fontWeight:400,color:col.cream}}>Aura Spa</p>}
          <div>{spLogo&&<p className="display"style={{fontSize:18,fontWeight:400,color:col.cream}}>Aura Spa</p>}<p style={{fontSize:11,color:col.taupe,marginTop:spLogo?-4:2,textTransform:"uppercase",letterSpacing:"0.08em"}}>{t.admin.adminPanel}</p></div>
        </button>
      </div>
      <nav style={{flex:1,padding:"16px 12px"}}>
        {nav.map(item=><button key={item.id}onClick={()=>setSec(item.id)}aria-current={sec===item.id?"page":undefined}style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 12px",background:sec===item.id?"rgba(255,255,255,0.12)":"transparent",border:"none",borderRadius:6,color:sec===item.id?col.cream:col.taupe,fontSize:13,cursor:"pointer",marginBottom:4,transition:"all 0.15s",textAlign:"left"}}><span aria-hidden="true">{item.icon}</span>{item.label}</button>)}
      </nav>
      <div style={{padding:"16px 20px",borderTop:"1px solid rgba(255,255,255,0.1)"}}>
        <button onClick={()=>setPage("profile")}style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"10px 12px",cursor:"pointer",width:"100%",marginBottom:8,transition:"all 0.2s"}}>
          <Avatar name={user.name}size={32}role={user.role}/>
          <div style={{textAlign:"left"}}><p style={{fontSize:13,color:col.cream,fontWeight:500}}>{user.name.split(" ")[0]}</p><p style={{fontSize:11,color:col.taupe}}>{t.profile.roleAdmin}</p></div>
        </button>
        <button onClick={()=>setPage("home")}style={{background:"none",border:"none",color:col.taupe,fontSize:12,cursor:"pointer",display:"block",width:"100%",textAlign:"left"}}>← {t.nav.home}</button>
      </div>
    </aside>
    <main id="main-content"tabIndex={-1}style={{flex:1,padding:"32px 28px",overflow:"auto",background:col.cream,width:"100%",height:"100%"}}>
      {sec==="dashboard"&&<div className="anim-fadeup">
        <h2 className="display"style={{fontSize:36,fontWeight:300,marginBottom:4,color:col.espresso}}>Resumen del Día</h2>
        <p style={{color:col.g600,marginBottom:28}}>{new Date().toLocaleDateString("es-CO",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:14,marginBottom:32}}>
          <StatCard label={t.admin.today}value={stats.todayTotal}/><StatCard label={t.admin.confirmed}value={stats.confirmed}color={C.sage}/><StatCard label={t.admin.pending}value={stats.pending}color={C.gold}/><StatCard label={t.admin.attended}value={stats.attended}color="#3730A3"/><StatCard label={t.admin.cancelled}value={stats.cancelled}color="#9B1C1C"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(350px,1fr))",gap:20,marginBottom:32}}>
          <Card style={{padding:"20px"}}>
            <h3 style={{fontSize:18,fontWeight:500,marginBottom:16,color:col.espresso}}>Citas por Estado</h3>
            <canvas ref={canvasRef1}width={300}height={200}style={{maxWidth:"100%",height:"auto"}}/>
          </Card>
          <Card style={{padding:"20px"}}>
            <h3 style={{fontSize:18,fontWeight:500,marginBottom:16,color:col.espresso}}>Servicios Más Solicitados</h3>
            <canvas ref={canvasRef2}width={300}height={200}style={{maxWidth:"100%",height:"auto"}}/>
          </Card>
        </div>
        <h3 className="display"style={{fontSize:24,fontWeight:400,marginBottom:16,color:col.espresso}}>{t.admin.agenda}</h3>
        {todayApts.length===0?<Card style={{padding:32,textAlign:"center"}}><p style={{color:col.g400}}>{t.admin.noToday}</p></Card>
        :<div style={{display:"flex",flexDirection:"column",gap:10}}>
          {todayApts.sort((a,b)=>a.time.localeCompare(b.time)).map(apt=>{const svc=services.find(s=>s.id===apt.serviceId);const pro=professionals.find(p=>p.id===apt.professionalId);return<Card key={apt.id}style={{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}><div style={{display:"flex",gap:16,alignItems:"center"}}><span style={{fontSize:16,fontWeight:600,color:col.brown,minWidth:48}}>{apt.time}</span><div><p style={{fontWeight:500,fontSize:14,color:col.espresso}}>{apt.clientName}</p><p style={{fontSize:12,color:col.g600}}>{svc?.name} · {pro?.name}</p></div></div><div style={{display:"flex",gap:8,alignItems:"center"}}><Tag status={apt.status}/><Btn variant="ghost"style={{fontSize:12}}onClick={()=>setModal({type:"detail",data:apt})}>{t.admin.manage}</Btn></div></Card>;})}
        </div>}
      </div>}
      {sec==="appointments"&&<div className="anim-fadeup">
        <h2 className="display"style={{fontSize:36,fontWeight:300,marginBottom:20,color:col.espresso}}>{t.admin.appointments}</h2>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}role="group"aria-label="Filtros">
          {["all","confirmed","pending","attended","cancelled","rescheduled"].map(f=><button key={f}onClick={()=>setFilter(f)}aria-pressed={filter===f}style={{padding:"6px 16px",borderRadius:20,border:`1px solid ${filter===f?col.brown:col.sand}`,background:filter===f?col.espresso:"transparent",color:filter===f?col.cream:col.g600,fontSize:12,cursor:"pointer",transition:"all 0.15s",fontFamily:"DM Sans,sans-serif"}}>{f==="all"?t.admin.allFilter:t.status[f]}</button>)}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filteredApts.sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time)).map(apt=>{const svc=services.find(s=>s.id===apt.serviceId);const pro=professionals.find(p=>p.id===apt.professionalId);return<Card key={apt.id}style={{padding:"16px 20px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}><div><p style={{fontWeight:500,fontSize:14,color:col.espresso}}>{apt.clientName}</p><p style={{fontSize:12,color:col.g600}}>{svc?.name} · {pro?.name} · {apt.date} {apt.time}</p></div><div style={{display:"flex",gap:8,alignItems:"center"}}><Tag status={apt.status}/><Btn variant="ghost"style={{fontSize:12}}onClick={()=>setModal({type:"detail",data:apt})}>{t.admin.manage}</Btn></div></div></Card>;})}
          {filteredApts.length===0&&<Card style={{padding:32,textAlign:"center"}}><p style={{color:col.g400}}>{t.admin.noFilter}</p></Card>}
        </div>
      </div>}
      {sec==="services"&&<div className="anim-fadeup">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <h2 className="display"style={{fontSize:36,fontWeight:300,color:col.espresso}}>{t.admin.services}</h2>
          <Btn onClick={()=>setModal({type:"addService"})}>{t.admin.newService}</Btn>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {services.map(svc=><Card key={svc.id}style={{padding:16,opacity:svc.active?1:0.55}}><div style={{marginBottom:12,borderRadius:6,overflow:"hidden",background:col.sand,height:180,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>{svc.image?<img src={svc.image}alt={svc.name}style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{fontSize:64,opacity:0.5}}>{EMOJI[svc.category]||"🌿"}</div>}</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}><div><span style={{fontSize:11,background:col.sand,padding:"2px 8px",borderRadius:10,color:col.brown}}>{svc.category}</span><h3 style={{fontWeight:500,marginTop:6,marginBottom:4,color:col.espresso}}>{svc.name}</h3><p style={{fontSize:13,color:col.g600}}>{svc.duration} {t.min} · {fmt(svc.price)}</p></div></div><div style={{display:"flex",gap:8}}><button onClick={()=>{document.querySelector(`input[data-service-id="${svc.id}"]`)?.click()}}style={{flex:1,fontSize:11,background:col.espresso,border:"none",color:col.cream,borderRadius:4,padding:"6px",cursor:"pointer"}}>📷 Foto</button><button onClick={()=>setServices(p=>p.map(s=>s.id===svc.id?{...s,active:!s.active}:s))}aria-pressed={svc.active}style={{flex:1,fontSize:11,border:`1px solid ${svc.active?C.sage:col.taupe}`,background:"none",borderRadius:4,color:svc.active?C.sage:col.taupe,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>{svc.active?"✓":"✕"}</button></div><input type="file"accept="image/*"data-service-id={svc.id}onChange={async e=>{const file=e.target.files?.[0];if(file){const compressed=await compressImage(file,600,0.75);setServices(p=>p.map(s=>s.id===svc.id?{...s,image:compressed}:s));setImgToast({msg:"✓ Imagen del servicio guardada",type:"success"});setTimeout(()=>setImgToast(null),2500)}}}style={{display:"none"}}/></Card>)}
        </div>
      </div>}
      {sec==="professionals"&&<div className="anim-fadeup">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <h2 className="display"style={{fontSize:36,fontWeight:300,color:col.espresso}}>{t.admin.professionals}</h2>
          <Btn onClick={()=>setModal({type:"addPro"})}>{t.admin.newPro}</Btn>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {professionals.map(pro=>{const actApts=appointments.filter(a=>a.professionalId===pro.id&&a.status!=="cancelled");return<Card key={pro.id}style={{padding:"20px 24px",opacity:pro.active?1:0.55}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}><div style={{display:"flex",gap:16,alignItems:"center"}}><div aria-hidden="true"style={{width:44,height:44,borderRadius:"50%",background:col.sand,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>👩</div><div><h3 style={{fontWeight:500,color:col.espresso}}>{pro.name}</h3><p style={{fontSize:13,color:col.g600}}>{pro.specialty} · {pro.scheduleStart}–{pro.scheduleEnd}</p></div></div><div style={{display:"flex",gap:12,alignItems:"center"}}><span style={{fontSize:13,color:col.g600}}>{actApts.length} {t.admin.activeApts}</span><button onClick={()=>setProfessionals(p=>p.map(x=>x.id===pro.id?{...x,active:!x.active}:x))}aria-pressed={pro.active}style={{fontSize:11,border:`1px solid ${pro.active?C.sage:col.taupe}`,background:"none",borderRadius:10,padding:"4px 12px",color:pro.active?C.sage:col.taupe,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>{pro.active?t.admin.activeF:t.admin.inactiveF}</button></div></div></Card>;})}
        </div>
      </div>}
      {sec==="config"&&<div className="anim-fadeup">
        <h2 className="display"style={{fontSize:36,fontWeight:300,marginBottom:28,color:col.espresso}}>Configuracion del Sistema 🔧</h2>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24,borderBottom:`1px solid ${col.sand}`,paddingBottom:16}}>
          {["general","usuarios","servicios","empleados","agenda","pagos","notif","inventario","reportes","seguridad","imagenes","personalizacion"].map(tab=><button key={tab}onClick={()=>setConfigTab(tab)}style={{padding:"8px 16px",background:configTab===tab?col.espresso:"transparent",border:`1px solid ${configTab===tab?col.brown:col.sand}`,borderRadius:6,color:configTab===tab?col.cream:col.g600,fontSize:12,cursor:"pointer",transition:"all 0.2s",fontFamily:"DM Sans,sans-serif",fontWeight:configTab===tab?600:400}}>{tab==="general"?"General":tab==="usuarios"?"Usuarios":tab==="servicios"?"Servicios":tab==="empleados"?"Empleados":tab==="agenda"?"Agenda":tab==="pagos"?"Pagos":tab==="notif"?"Notificaciones":tab==="inventario"?"Inventario":tab==="reportes"?"Reportes":tab==="seguridad"?"Seguridad":tab==="imagenes"?"Imágenes Landing":"Personalizacion"}</button>)}
        </div>
        
        {configTab==="general"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
          <Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Informacion General</h3><div style={{display:"flex",flexDirection:"column",gap:12}}><div><Lbl>Nombre Comercial</Lbl><Input value={companyData.businessName||"Aura Spa"}onChange={e=>setCompanyData(p=>({...p,businessName:e.target.value}))}/></div><div><Lbl>Razon Social</Lbl><Input value={companyData.legalName||"Aura Spa S.A.S"}onChange={e=>setCompanyData(p=>({...p,legalName:e.target.value}))}/></div><div><Lbl>NIT / RUT</Lbl><Input value={companyData.nit||"9999999999-9"}onChange={e=>setCompanyData(p=>({...p,nit:e.target.value}))}/></div></div></Card>
          <Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Ubicacion</h3><div style={{display:"flex",flexDirection:"column",gap:12}}><div><Lbl>Direccion</Lbl><textarea value={companyData.address}onChange={e=>setCompanyData(p=>({...p,address:e.target.value}))}rows={2}style={{width:"100%",border:`1px solid ${col.sand}`,borderRadius:4,padding:"10px 14px",fontSize:13,fontFamily:"DM Sans,sans-serif",color:col.espresso,background:col.white}}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><div><Lbl>Departamento</Lbl><select value={companyData.state||"Cundinamarca"}onChange={e=>{setCompanyData(p=>({...p,state:e.target.value,city:DEPARTMENTS_COLOMBIA[e.target.value]?.cities[0]||""}))}}style={{width:"100%",padding:"10px",border:`1px solid ${col.sand}`,borderRadius:4,fontSize:13,color:col.espresso,background:col.white,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}><option value="">Seleccionar departamento...</option>{Object.keys(DEPARTMENTS_COLOMBIA).sort().map(dept=><option key={dept}value={dept}>{dept}</option>)}</select></div><div><Lbl>Ciudad</Lbl><select value={companyData.city||"Bogotá"}onChange={e=>setCompanyData(p=>({...p,city:e.target.value}))}style={{width:"100%",padding:"10px",border:`1px solid ${col.sand}`,borderRadius:4,fontSize:13,color:col.espresso,background:col.white,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}><option value="">Seleccionar ciudad...</option>{DEPARTMENTS_COLOMBIA[companyData.state||"Cundinamarca"]?.cities.map(city=><option key={city}value={city}>{city}</option>)||<option>Sin ciudades</option>}</select></div></div></div></Card>
          <Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Contacto</h3><div style={{display:"flex",flexDirection:"column",gap:12}}><div><Lbl>Telefono Principal</Lbl><Input value={companyData.phone}onChange={e=>setCompanyData(p=>({...p,phone:e.target.value}))}/></div><div><Lbl>Correo Electronico</Lbl><Input type="email"value={companyData.email}onChange={e=>setCompanyData(p=>({...p,email:e.target.value}))}/></div></div></Card>
          <Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Horarios</h3><div style={{display:"flex",flexDirection:"column",gap:16}}><div><h4 style={{fontSize:14,fontWeight:500,color:col.espresso,marginBottom:8}}>Lunes - Viernes</h4><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><Lbl>Hora Apertura</Lbl><Input type="time"value={companyData.weekStart||"09:00"}onChange={e=>setCompanyData(p=>({...p,weekStart:e.target.value}))}/></div><div><Lbl>Hora Cierre</Lbl><Input type="time"value={companyData.weekEnd||"20:00"}onChange={e=>setCompanyData(p=>({...p,weekEnd:e.target.value}))}/></div></div><p style={{fontSize:12,color:col.g600,marginTop:4}}>{companyData.weekStart||"09:00"} - {companyData.weekEnd||"20:00"}</p></div><div><h4 style={{fontSize:14,fontWeight:500,color:col.espresso,marginBottom:8}}>Sábado</h4><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><Lbl>Hora Apertura</Lbl><Input type="time"value={companyData.satStart||"09:00"}onChange={e=>setCompanyData(p=>({...p,satStart:e.target.value}))}/></div><div><Lbl>Hora Cierre</Lbl><Input type="time"value={companyData.satEnd||"18:00"}onChange={e=>setCompanyData(p=>({...p,satEnd:e.target.value}))}/></div></div><p style={{fontSize:12,color:col.g600,marginTop:4}}>{companyData.satStart||"09:00"} - {companyData.satEnd||"18:00"}</p></div><div><h4 style={{fontSize:14,fontWeight:500,color:col.espresso,marginBottom:8}}>Domingo</h4><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><Lbl>Hora Apertura</Lbl><Input type="time"value={companyData.sunStart||"10:00"}onChange={e=>setCompanyData(p=>({...p,sunStart:e.target.value}))}/></div><div><Lbl>Hora Cierre</Lbl><Input type="time"value={companyData.sunEnd||"17:00"}onChange={e=>setCompanyData(p=>({...p,sunEnd:e.target.value}))}/></div></div><p style={{fontSize:12,color:col.g600,marginTop:4}}>{companyData.sunStart||"10:00"} - {companyData.sunEnd||"17:00"}</p></div></div></Card>
          <Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Redes Sociales</h3><div style={{display:"flex",flexDirection:"column",gap:12}}><div><Lbl>Instagram</Lbl><Input placeholder="@auraspa"value={companyData.instagram||""}onChange={e=>setCompanyData(p=>({...p,instagram:e.target.value}))}/></div><div><Lbl>Facebook</Lbl><Input placeholder="facebook.com/auraspa"value={companyData.facebook||""}onChange={e=>setCompanyData(p=>({...p,facebook:e.target.value}))}/></div><div><Lbl>WhatsApp</Lbl><Input placeholder="+57 300 123 4567"value={companyData.whatsapp||""}onChange={e=>setCompanyData(p=>({...p,whatsapp:e.target.value}))}/></div></div></Card>
          <Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Mensaje de Bienvenida</h3><div style={{display:"flex",flexDirection:"column",gap:12}}><div><Lbl>Mensaje para Clientes</Lbl><textarea value={companyData.welcomeMsg||"Bienvenido a Aura Spa"}onChange={e=>setCompanyData(p=>({...p,welcomeMsg:e.target.value}))}rows={3}style={{width:"100%",border:`1px solid ${col.sand}`,borderRadius:4,padding:"10px 14px",fontSize:13,fontFamily:"DM Sans,sans-serif",color:col.espresso,background:col.white}}/></div></div></Card>
        </div>}
        <div style={{display:configTab==="general"?"flex":"none",gap:8,marginTop:24,justifyContent:"flex-end"}}><Btn onClick={()=>{const toast=document.createElement("div");toast.style.cssText="position:fixed;top:20px;right:20px;background:#3D7454;color:#FAF7F2;padding:12px 20px;borderRadius:6px;fontSize:13px;zIndex:10000;fontWeight:500;";toast.textContent="✓ Datos guardados exitosamente";document.body.appendChild(toast);setTimeout(()=>toast.remove(),2500);}}style={{padding:"10px 20px"}}>Guardar Cambios</Btn></div>
        
        {configTab==="usuarios"&&
        <div>
          <h3 style={{fontSize:18,fontWeight:600,marginBottom:20,color:col.espresso}}>Gestion de Usuarios</h3>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:24}}>
            <Card style={{padding:28}}>
              <h4 style={{fontSize:14,fontWeight:600,marginBottom:16,color:col.espresso}}>Usuarios del Sistema</h4>
              {users&&users.length>0 && (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {users.map(usr=>
                <div key={usr.email}style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,border:`1px solid ${col.sand}`,borderRadius:6,background:col.white}}>
                  <div>
                    <h5 style={{fontSize:13,fontWeight:600,color:col.espresso}}>{usr.email}</h5>
                    <p style={{fontSize:11,color:col.g600}}>{usr.role} · {usr.active?"Activo":"Inactivo"}</p>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>setEditUser(usr)}style={{padding:"4px 8px",fontSize:11,background:col.espresso,color:col.cream,border:"none",borderRadius:4,cursor:"pointer"}}>Editar</button>
                    <button onClick={()=>setUsers(p=>p.filter(x=>x.email!==usr.email))}style={{padding:"4px 8px",fontSize:11,background:"#9B1C1C",color:col.cream,border:"none",borderRadius:4,cursor:"pointer"}}>Eliminar</button>
                  </div>
                </div>
                )}
              </div>
              )}
              {!users || users.length === 0 && (
              <p style={{color:col.g600,fontSize:13}}>Sin usuarios creados aun</p>
              )}
            </Card>
            <Card style={{padding:28}}>
              <h4 style={{fontSize:14,fontWeight:600,marginBottom:16,color:col.espresso}}>{editUser?"Editar Usuario":"Nuevo Usuario"}</h4>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div>
                  <Lbl>Email</Lbl>
                  <Input type="email"value={editUser?.email||""}onChange={e=>editUser&&setEditUser({...editUser,email:e.target.value})}placeholder="usuario@empresa.com"/>
                </div>
                <div>
                  <Lbl>Contrasena</Lbl>
                  <Input type="password"placeholder="Dejar en blanco para usar actual"/>
                </div>
                <div>
                  <Lbl>Rol</Lbl>
                  <select value={editUser?.role||""}onChange={e=>editUser&&setEditUser({...editUser,role:e.target.value})}style={{width:"100%",padding:"10px",border:`1px solid ${col.sand}`,borderRadius:4,fontSize:13,color:col.espresso}}>
                    <option value="">Seleccionar rol...</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Recepcionista">Recepcionista</option>
                    <option value="Terapeuta">Terapeuta</option>
                    <option value="Contador">Contador</option>
                  </select>
                </div>
                <div>
                  <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
                    <input type="checkbox"checked={editUser?.active||false}onChange={e=>editUser&&setEditUser({...editUser,active:e.target.checked})}style={{cursor:"pointer"}}/>
                    <span style={{fontSize:13,color:col.espresso}}>Usuario Activo</span>
                  </label>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <Btn onClick={()=>{if(editUser?.email&&users?.find(u=>u.email===editUser.email)){setUsers(p=>p.map(x=>x.email===editUser.email?editUser:x))}else if(editUser?.email){setUsers(p=>[...p,editUser])}setEditUser(null)}}style={{flex:1,padding:"10px"}}>Guardar</Btn>
                  <Btn variant="secondary"onClick={()=>setEditUser(null)}style={{flex:1,padding:"10px"}}>Cancelar</Btn>
                </div>
              </div>
            </Card>
          </div>
        </div>
        }
        
        {configTab==="servicios"&&
        <div>
          <h3 style={{fontSize:18,fontWeight:600,marginBottom:20,color:col.espresso}}>Gestion de Servicios</h3>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:24}}>
            <Card style={{padding:28}}>
              <h4 style={{fontSize:14,fontWeight:600,marginBottom:16,color:col.espresso}}>Servicios Registrados</h4>
              {services.length>0 && (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {services.map(svc=>
                <div key={svc.id}style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,border:`1px solid ${col.sand}`,borderRadius:6,background:svc.active?col.white:col.sand}}>
                  <div>
                    <h5 style={{fontSize:13,fontWeight:600,color:col.espresso}}>{svc.name}</h5>
                    <p style={{fontSize:11,color:col.g600}}>{svc.category} · {svc.duration} min · ${fmt(svc.price)}</p>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>setEditService(svc)}style={{padding:"4px 8px",fontSize:11,background:col.espresso,color:col.cream,border:"none",borderRadius:4,cursor:"pointer"}}>Editar</button>
                    <button onClick={()=>setServices(p=>p.filter(x=>x.id!==svc.id))}style={{padding:"4px 8px",fontSize:11,background:"#9B1C1C",color:col.cream,border:"none",borderRadius:4,cursor:"pointer"}}>Eliminar</button>
                  </div>
                </div>
                )}
              </div>
              )}
              {services.length === 0 && (
              <p style={{color:col.g600,fontSize:13}}>Sin servicios registrados</p>
              )}
            </Card>
            <Card style={{padding:28}}>
              <h4 style={{fontSize:14,fontWeight:600,marginBottom:16,color:col.espresso}}>{editService?"Editar Servicio":"Nuevo Servicio"}</h4>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div>
                  <Lbl>Nombre</Lbl>
                  <Input value={editService?.name||""}onChange={e=>editService&&setEditService({...editService,name:e.target.value})}placeholder="Ej: Masaje Relajante"/>
                </div>
                <div>
                  <Lbl>Categoria</Lbl>
                  <Input value={editService?.category||""}onChange={e=>editService&&setEditService({...editService,category:e.target.value})}placeholder="Ej: Masajes"/>
                </div>
                <div>
                  <Lbl>Duracion (min)</Lbl>
                  <Input type="number"value={editService?.duration||""}onChange={e=>editService&&setEditService({...editService,duration:Number(e.target.value)})}placeholder="60"/>
                </div>
                <div>
                  <Lbl>Precio COP</Lbl>
                  <Input type="number"value={editService?.price||""}onChange={e=>editService&&setEditService({...editService,price:Number(e.target.value)})}placeholder="150000"/>
                </div>
                <div>
                  <Lbl>Comision %</Lbl>
                  <Input type="number"value={editService?.commission||30}onChange={e=>editService&&setEditService({...editService,commission:Number(e.target.value)})}min="0"max="100"/>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <Btn onClick={()=>{if(editService&&editService.id){setServices(p=>p.map(x=>x.id===editService.id?editService:x))}else if(editService){setServices(p=>[...p,{...editService,id:Date.now(),active:true}])}setEditService(null)}}style={{flex:1,padding:"10px"}}>Guardar</Btn>
                  <Btn variant="secondary"onClick={()=>setEditService(null)}style={{flex:1,padding:"10px"}}>Cancelar</Btn>
                </div>
              </div>
            </Card>
          </div>
        </div>
        }
        
        {configTab==="empleados"&&
        <div>
          <h3 style={{fontSize:18,fontWeight:600,marginBottom:20,color:col.espresso}}>Gestion de Empleados</h3>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:24}}>
            <Card style={{padding:28}}>
              <h4 style={{fontSize:14,fontWeight:600,marginBottom:16,color:col.espresso}}>Empleados Registrados</h4>
              {professionals.length>0 && (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {professionals.map(pro=>
                <div key={pro.id}style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,border:`1px solid ${col.sand}`,borderRadius:6,background:pro.active?col.white:col.sand}}>
                  <div>
                    <h5 style={{fontSize:13,fontWeight:600,color:col.espresso}}>{pro.name}</h5>
                    <p style={{fontSize:11,color:col.g600}}>{pro.specialty} · {pro.scheduleStart}-{pro.scheduleEnd}</p>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>setEditProf(pro)}style={{padding:"4px 8px",fontSize:11,background:col.espresso,color:col.cream,border:"none",borderRadius:4,cursor:"pointer"}}>Editar</button>
                    <button onClick={()=>setProfessionals(p=>p.filter(x=>x.id!==pro.id))}style={{padding:"4px 8px",fontSize:11,background:"#9B1C1C",color:col.cream,border:"none",borderRadius:4,cursor:"pointer"}}>Eliminar</button>
                  </div>
                </div>
                )}
              </div>
              )}
              {professionals.length === 0 && (
              <p style={{color:col.g600,fontSize:13}}>Sin empleados registrados</p>
              )}
            </Card>
            <Card style={{padding:28}}>
              <h4 style={{fontSize:14,fontWeight:600,marginBottom:16,color:col.espresso}}>{editProf?"Editar Empleado":"Nuevo Empleado"}</h4>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div>
                  <Lbl>Nombre</Lbl>
                  <Input value={editProf?.name||""}onChange={e=>editProf&&setEditProf({...editProf,name:e.target.value})}placeholder="Ej: Maria Garcia"/>
                </div>
                <div>
                  <Lbl>Especialidad</Lbl>
                  <Input value={editProf?.specialty||""}onChange={e=>editProf&&setEditProf({...editProf,specialty:e.target.value})}placeholder="Masaje, Facial"/>
                </div>
                <div>
                  <Lbl>Hora Inicio</Lbl>
                  <Input type="time"value={editProf?.scheduleStart||"09:00"}onChange={e=>editProf&&setEditProf({...editProf,scheduleStart:e.target.value})}/>
                </div>
                <div>
                  <Lbl>Hora Fin</Lbl>
                  <Input type="time"value={editProf?.scheduleEnd||"18:00"}onChange={e=>editProf&&setEditProf({...editProf,scheduleEnd:e.target.value})}/>
                </div>
                <div>
                  <Lbl>Comision %</Lbl>
                  <Input type="number"value={editProf?.commission||30}onChange={e=>editProf&&setEditProf({...editProf,commission:Number(e.target.value)})}min="0"max="100"/>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <Btn onClick={()=>{if(editProf&&editProf.id){setProfessionals(p=>p.map(x=>x.id===editProf.id?editProf:x))}else if(editProf){setProfessionals(p=>[...p,{...editProf,id:Date.now(),active:true}])}setEditProf(null)}}style={{flex:1,padding:"10px"}}>Guardar</Btn>
                  <Btn variant="secondary"onClick={()=>setEditProf(null)}style={{flex:1,padding:"10px"}}>Cancelar</Btn>
                </div>
              </div>
            </Card>
          </div>
        </div>
        }
        
        {configTab==="agenda"&&<div><Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Configuracion de Agenda</h3><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><Lbl>Intervalo de Tiempo (min)</Lbl><select value={agendaConfig.interval}onChange={e=>setAgendaConfig(p=>({...p,interval:Number(e.target.value)}))}style={{width:"100%",padding:"10px",border:`1px solid ${col.sand}`,borderRadius:4,fontSize:13,color:col.espresso}}><option value="30">30 minutos</option><option value="45">45 minutos</option><option value="60">1 hora</option></select></div><div><Lbl>Descanso Entre Citas (min)</Lbl><Input type="number"value={agendaConfig.rest}onChange={e=>setAgendaConfig(p=>({...p,rest:Number(e.target.value)}))}min="0"max="60"/></div><div><Lbl>Capacidad Simultanea de Citas</Lbl><Input type="number"value={agendaConfig.capacity}onChange={e=>setAgendaConfig(p=>({...p,capacity:Number(e.target.value)}))}min="1"max="10"/></div><div><Lbl>Politica de Cancelacion (horas)</Lbl><Input type="number"value={agendaConfig.cancel}onChange={e=>setAgendaConfig(p=>({...p,cancel:Number(e.target.value)}))}min="0"max="48"/></div></div><Btn onClick={()=>{}}style={{marginTop:12,width:"100%",padding:"12px"}}>Guardar Configuracion de Agenda</Btn></Card></div>}
        
        {configTab==="pagos"&&<div><Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Configuracion de Pagos</h3><div style={{background:col.sand,padding:12,borderRadius:8,marginBottom:16}}><p style={{fontSize:12,color:col.brown,fontWeight:500}}>Metodos de Pago: Efectivo ✓ Tarjeta ✓ Transferencia ✓</p></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><Lbl>Impuesto IVA %</Lbl><Input type="number"value={payConfig.iva}onChange={e=>setPayConfig(p=>({...p,iva:Number(e.target.value)}))}min="0"max="100"/></div><div><Lbl>Moneda</Lbl><Input value="COP"disabled/></div><div><Lbl>Descuento Maximo %</Lbl><Input type="number"value={payConfig.discount}onChange={e=>setPayConfig(p=>({...p,discount:Number(e.target.value)}))}min="0"max="100"/></div><div><Lbl>Numero Factura Inicial</Lbl><Input type="number"value={payConfig.numFactura}onChange={e=>setPayConfig(p=>({...p,numFactura:Number(e.target.value)}))}min="1"/></div></div><div style={{marginTop:16,padding:12,background:col.sand,borderRadius:8}}><p style={{fontSize:12,color:col.brown,fontWeight:500}}>Integracion con Pasarela de Pago: <strong>Connectable via API</strong></p></div><Btn onClick={()=>{}}style={{marginTop:12,width:"100%",padding:"12px"}}>Guardar Configuracion de Pagos</Btn></Card></div>}
        
        {configTab==="notif"&&<div><Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Configuracion de Notificaciones</h3><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{border:`1px solid ${col.sand}`,padding:14,borderRadius:6}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><input type="checkbox"id="email-confirm"checked={notifConfig.emailConfirm}onChange={e=>setNotifConfig(p=>({...p,emailConfirm:e.target.checked}))}/><label htmlFor="email-confirm"style={{fontSize:13,color:col.espresso,fontWeight:500}}>Confirmacion por Email</label></div><p style={{fontSize:12,color:col.g600}}>Correo cuando cliente reserva cita</p></div><div style={{border:`1px solid ${col.sand}`,padding:14,borderRadius:6}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><input type="checkbox"id="email-reminder"checked={notifConfig.emailReminder}onChange={e=>setNotifConfig(p=>({...p,emailReminder:e.target.checked}))}/><label htmlFor="email-reminder"style={{fontSize:13,color:col.espresso,fontWeight:500}}>Recordatorio (24h antes)</label></div><p style={{fontSize:12,color:col.g600}}>Notificacion previa a la cita</p></div><div style={{border:`1px solid ${col.sand}`,padding:14,borderRadius:6}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><input type="checkbox"id="whatsapp-notif"checked={notifConfig.whatsapp}onChange={e=>setNotifConfig(p=>({...p,whatsapp:e.target.checked}))}/><label htmlFor="whatsapp-notif"style={{fontSize:13,color:col.espresso,fontWeight:500}}>Notificaciones WhatsApp</label></div><p style={{fontSize:12,color:col.g600}}>Mensajes via WhatsApp Business</p></div></div><div style={{marginTop:16}}><Lbl>Template de Mensaje Personalizado</Lbl><textarea rows={3}value={notifConfig.template}onChange={e=>setNotifConfig(p=>({...p,template:e.target.value}))}placeholder="Hola {cliente}, tu cita en Aura Spa es el {fecha} a las {hora}"style={{width:"100%",border:`1px solid ${col.sand}`,borderRadius:4,padding:"10px 14px",fontSize:13,fontFamily:"DM Sans,sans-serif",color:col.espresso,background:col.white}}/></div><Btn onClick={()=>{}}style={{marginTop:12,width:"100%",padding:"12px"}}>Guardar Configuracion de Notificaciones</Btn></Card></div>}
        
        {configTab==="inventario"&&
        <div>
          <h3 style={{fontSize:18,fontWeight:600,marginBottom:20,color:col.espresso}}>Control de Inventario</h3>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:24}}>
            <Card style={{padding:28}}>
              <h4 style={{fontSize:14,fontWeight:600,marginBottom:16,color:col.espresso}}>Productos Registrados</h4>
              {inventory && inventory.length>0 && (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {inventory.map(item=>
                <div key={item.id}style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,border:`1px solid ${col.sand}`,borderRadius:6,background:item.stock<item.min?"#FEE2E2":col.white}}>
                  <div>
                    <h5 style={{fontSize:13,fontWeight:600,color:col.espresso}}>{item.name}</h5>
                    <p style={{fontSize:11,color:col.g600}}>Stock: {item.stock} (Min: {item.min}) · {item.provider}</p>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>setEditInv(item)}style={{padding:"4px 8px",fontSize:11,background:col.espresso,color:col.cream,border:"none",borderRadius:4,cursor:"pointer"}}>Editar</button>
                    <button onClick={()=>setInventory(p=>p.filter(x=>x.id!==item.id))}style={{padding:"4px 8px",fontSize:11,background:"#9B1C1C",color:col.cream,border:"none",borderRadius:4,cursor:"pointer"}}>Eliminar</button>
                  </div>
                </div>
                )}
              </div>
              )}
              {!inventory || inventory.length === 0 && (
              <p style={{color:col.g600,fontSize:13}}>Sin productos registrados</p>
              )}
            </Card>
            <Card style={{padding:28}}>
              <h4 style={{fontSize:14,fontWeight:600,marginBottom:16,color:col.espresso}}>{editInv?"Editar Producto":"Nuevo Producto"}</h4>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div>
                  <Lbl>Nombre del Producto</Lbl>
                  <Input value={editInv?.name||""}onChange={e=>editInv&&setEditInv({...editInv,name:e.target.value})}placeholder="Ej: Aceite de Almendra"/>
                </div>
                <div>
                  <Lbl>Stock Actual</Lbl>
                  <Input type="number"value={editInv?.stock||0}onChange={e=>editInv&&setEditInv({...editInv,stock:Number(e.target.value)})}min="0"/>
                </div>
                <div>
                  <Lbl>Stock Minimo</Lbl>
                  <Input type="number"value={editInv?.min||0}onChange={e=>editInv&&setEditInv({...editInv,min:Number(e.target.value)})}min="0"/>
                </div>
                <div>
                  <Lbl>Proveedor</Lbl>
                  <Input value={editInv?.provider||""}onChange={e=>editInv&&setEditInv({...editInv,provider:e.target.value})}placeholder="Ej: Distribuidor A"/>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <Btn onClick={()=>{if(editInv?.id){setInventory(p=>p.map(x=>x.id===editInv.id?editInv:x))}else if(editInv){setInventory(p=>[...p,{...editInv,id:Date.now()}])}setEditInv(null)}}style={{flex:1,padding:"10px"}}>Guardar</Btn>
                  <Btn variant="secondary"onClick={()=>setEditInv(null)}style={{flex:1,padding:"10px"}}>Cancelar</Btn>
                </div>
              </div>
            </Card>
          </div>
        </div>
        }
        
        {configTab==="reportes"&&<div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14,marginBottom:28}}>{((reportData)=>[{title:"Ingresos",icon:"💰",desc:"Total del mes",value:`$${reportData.totalIncome.toLocaleString("es-CO",{maximumFractionDigits:0})}`},{title:"Servicios",icon:"✨",desc:"Mas vendidos",value:`${reportData.topService?.name || "N/A"}`},{title:"Empleados",icon:"👩",desc:"Mayor venta",value:`${reportData.topProfessional?.name || "N/A"}`},{title:"Clientes",icon:"👥",desc:"Completadas",value:`${reportData.attendedCount}`},{title:"Tendencias",icon:"📈",desc:"Crecimiento",value:`+${reportData.growthPercent}%`}].map(rep=><Card key={rep.title}style={{padding:20,textAlign:"center",cursor:"pointer",transition:"all 0.2s"}}onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}><div style={{fontSize:28,marginBottom:8}}>{rep.icon}</div><h4 style={{fontSize:14,fontWeight:600,color:col.espresso,marginBottom:4}}>{rep.title}</h4><p style={{fontSize:11,color:col.g600,marginBottom:8}}>{rep.desc}</p><p style={{fontSize:16,fontWeight:600,color:col.brown}}>{rep.value}</p></Card>))({totalIncome:services.reduce((sum,s)=>{const count=appointments.filter(a=>a.serviceId===s.id&&a.status==='attended').length;return sum+(count*(s.price||0));},0),topService:services.sort((a,b)=>appointments.filter(x=>x.serviceId===b.id&&x.status==='attended').length-appointments.filter(x=>x.serviceId===a.id&&x.status==='attended').length)[0],topProfessional:professionals.sort((a,b)=>appointments.filter(x=>x.professionalId===b.id&&x.status==='attended').length-appointments.filter(x=>x.professionalId===a.id&&x.status==='attended').length)[0],attendedCount:appointments.filter(a=>a.status==='attended').length,growthPercent:Math.round(((appointments.filter(a=>a.status==='attended').length/Math.max(appointments.length,1))*100))||0})}</div><Card style={{padding:20}}><h3 style={{fontSize:14,fontWeight:600,marginBottom:16,color:col.espresso}}>Detalles de Ingresos por Servicio</h3><table style={{width:"100%",fontSize:12,borderCollapse:"collapse"}}><thead><tr style={{borderBottom:`1px solid ${col.sand}`}}><th style={{textAlign:"left",padding:"8px 0",color:col.g600}}>Servicio</th><th style={{textAlign:"center",padding:"8px 0",color:col.g600}}>Vendidas</th><th style={{textAlign:"right",padding:"8px 0",color:col.g600}}>Ingresos</th></tr></thead><tbody>{services.map(svc=>{const count=appointments.filter(a=>a.serviceId===svc.id&&a.status==='attended').length;return<tr key={svc.id}style={{borderBottom:`1px solid ${col.sand}`}}><td style={{padding:"8px 0",color:col.espresso}}>{svc.name}</td><td style={{textAlign:"center",padding:"8px 0",color:col.espresso}}>{count}</td><td style={{textAlign:"right",padding:"8px 0",color:col.espresso,fontWeight:500}}>${(count*(svc.price||0)).toLocaleString("es-CO",{maximumFractionDigits:0})}</td></tr>})}</tbody></table></Card></div>}
        
        {configTab==="seguridad"&&<div><Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Seguridad del Sistema</h3><div style={{display:"flex",flexDirection:"column",gap:14}}><div style={{border:`1px solid ${col.sand}`,padding:14,borderRadius:6}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><span style={{fontSize:13,fontWeight:600,color:col.espresso}}>Copias de Seguridad Automaticas</span><Btn style={{fontSize:11,padding:"4px 12px"}}>Hacer Backup</Btn></div><p style={{fontSize:12,color:col.g600}}>Ultima copia: Hoy a las 2:30 AM</p></div><div style={{border:`1px solid ${col.sand}`,padding:14,borderRadius:6}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><span style={{fontSize:13,fontWeight:600,color:col.espresso}}>Doble Autenticacion (2FA)</span><button style={{padding:"4px 12px",background:C.sage,border:"none",borderRadius:4,color:col.white,fontSize:11,cursor:"pointer",fontWeight:500}}>Activar</button></div></div><div style={{border:`1px solid ${col.sand}`,padding:14,borderRadius:6}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><span style={{fontSize:13,fontWeight:600,color:col.espresso}}>Tiempo de Sesion</span><select style={{padding:"4px 8px",border:`1px solid ${col.sand}`,borderRadius:4,fontSize:11}}><option>15 minutos</option><option>30 minutos</option><option>1 hora</option><option>2 horas</option></select></div></div><div style={{marginTop:20,background:col.sand,padding:14,borderRadius:6}}><p style={{fontSize:12,color:col.brown,fontWeight:500}}>Historial de Auditoria: Acceso a todos los cambios en el sistema</p><Btn style={{fontSize:11,padding:"6px 12px",marginTop:8}}>Ver Logs</Btn></div></div></Card></div>}
        
        {configTab==="imagenes"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
            {!carouselImages ? (
              <Card style={{padding:28,gridColumn:"1 / -1",background:col.sand}}>
                <div style={{textAlign:"center",padding:"24px 0"}}>
                  <p style={{fontSize:14,color:"#8B0000",fontWeight:600,marginBottom:8}}>⚠️ Error al cargar las imágenes del landing</p>
                  <p style={{fontSize:12,color:col.g600,marginBottom:16}}>Intente recargar la página o contacte al soporte</p>
                  <button onClick={()=>window.location.reload()}style={{padding:"8px 16px",background:col.espresso,color:col.cream,border:"none",borderRadius:4,fontSize:12,cursor:"pointer",fontWeight:500}}>🔄 Recargar Página</button>
                </div>
              </Card>
            ) : (
              <>
                <Card style={{padding:28}}>
                  <h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>📷 Sección "Conecta tu esencia"</h3>
                  <div>
                    <Lbl>Imagen de Fondo</Lbl>
                    <div style={{border:`2px dashed ${col.sand}`,borderRadius:6,padding:14,textAlign:"center",background:col.white,marginBottom:12,minHeight:120,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}onClick={()=>document.getElementById("sec1-input")?.click()}>
                      {landingImages?.section1?<img src={landingImages.section1}alt="Section 1"style={{maxWidth:"100%",maxHeight:120,borderRadius:4,objectFit:"contain"}}/>:<p style={{fontSize:12,color:col.g600}}>Haz clic para cargar</p>}
                    </div>
                    <button onClick={()=>document.getElementById("sec1-input")?.click()}style={{width:"100%",padding:"10px",background:col.espresso,color:col.cream,border:"none",borderRadius:4,fontSize:13,fontWeight:500,cursor:"pointer",marginBottom:8}}>📤 {landingImages?.section1?"Cambiar":"Subir"} Imagen</button>
                    <input id="sec1-input"type="file"accept="image/*"onChange={async e=>{try{const file=e.target.files?.[0];if(file){const compressed=await compressImage(file,1000,0.8);setLandingImages(p=>({...p,section1:compressed}))}}catch(err){console.error("Error at section1 upload:",err)}}}style={{display:"none"}}/>
                  </div>
                </Card>
                
                <Card style={{padding:28}}>
                  <h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>🧖 Sección "Vivir al máximo"</h3>
                  <div>
                    <Lbl>Imagen de Fondo</Lbl>
                    <div style={{border:`2px dashed ${col.sand}`,borderRadius:6,padding:14,textAlign:"center",background:col.white,marginBottom:12,minHeight:120,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}onClick={()=>document.getElementById("sec2-input")?.click()}>
                      {landingImages?.section2?<img src={landingImages.section2}alt="Section 2"style={{maxWidth:"100%",maxHeight:120,borderRadius:4,objectFit:"contain"}}/>:<p style={{fontSize:12,color:col.g600}}>Haz clic para cargar</p>}
                    </div>
                    <button onClick={()=>document.getElementById("sec2-input")?.click()}style={{width:"100%",padding:"10px",background:col.espresso,color:col.cream,border:"none",borderRadius:4,fontSize:13,fontWeight:500,cursor:"pointer",marginBottom:8}}>📤 {landingImages?.section2?"Cambiar":"Subir"} Imagen</button>
                    <input id="sec2-input"type="file"accept="image/*"onChange={async e=>{try{const file=e.target.files?.[0];if(file){const compressed=await compressImage(file,1000,0.8);setLandingImages(p=>({...p,section2:compressed}))}}catch(err){console.error("Error at section2 upload:",err)}}}style={{display:"none"}}/>
                  </div>
                </Card>
                
                <Card style={{padding:28,gridColumn:"1 / -1"}}>
                  <h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>🎠 Carrusel "Galería de Inspiración" (5 Imágenes)</h3>
                  <p style={{fontSize:12,color:col.g600,marginBottom:20}}>Sube hasta 5 imágenes para el carrusel profesional que se muestra en la sección de bienestar</p>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12}}>
                    {[0,1,2,3,4].map(idx=>(
                      <div key={idx}style={{border:`2px dashed ${col.sand}`,borderRadius:6,padding:12,textAlign:"center",background:col.white,minHeight:140,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer"}}onClick={()=>document.getElementById(`carousel-${idx}`)?.click()}>
                        {carouselImages[idx]?<img src={carouselImages[idx]}alt={`Carousel ${idx+1}`}style={{maxWidth:"100%",maxHeight:100,borderRadius:4,objectFit:"cover"}}/>:<p style={{fontSize:24,marginBottom:4}}>📸</p>}
                        <p style={{fontSize:10,color:col.g600,marginTop:4}}>Imagen {idx+1}</p>
                        <button onClick={e=>{e.stopPropagation();document.getElementById(`carousel-${idx}`)?.click()}}style={{width:"100%",padding:"6px",background:col.espresso,color:col.cream,border:"none",borderRadius:3,fontSize:11,fontWeight:500,cursor:"pointer",marginTop:8}}>Subir</button>
                        <input id={`carousel-${idx}`}type="file"accept="image/*"onChange={async e=>{try{const file=e.target.files?.[0];if(file){const compressed=await compressImage(file,1200,0.8);setCarouselImages(p=>{const updated=[...p];updated[idx]=compressed;return updated;})}}catch(err){console.error(`Error uploading carousel image ${idx}:`,err)}}}style={{display:"none"}}/>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </div>
        )}
        
        {configTab==="personalizacion"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}><Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Personalizacion Visual</h3><div style={{display:"flex",flexDirection:"column",gap:12}}><div><Lbl>Tema</Lbl><select style={{width:"100%",padding:"10px",border:`1px solid ${col.sand}`,borderRadius:4,fontSize:13,color:col.espresso,background:col.white,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}><option>Claro</option><option>Oscuro</option><option>Automatico</option></select></div><div><Lbl>Idioma</Lbl><select style={{width:"100%",padding:"10px",border:`1px solid ${col.sand}`,borderRadius:4,fontSize:13,color:col.espresso,background:col.white,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}><option>Español</option><option>Ingles</option><option>Portugues</option></select></div><div><Lbl>Tamaño de Fuente</Lbl><select style={{width:"100%",padding:"10px",border:`1px solid ${col.sand}`,borderRadius:4,fontSize:13,color:col.espresso,background:col.white,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}><option>Pequeno</option><option>Normal</option><option>Grande</option></select></div></div></Card><Card style={{padding:28}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,color:col.espresso}}>Personalizacion de Marca</h3><div style={{display:"flex",flexDirection:"column",gap:16}}><div><Lbl>Logo del Spa</Lbl><div style={{border:`2px dashed ${col.sand}`,borderRadius:6,padding:16,textAlign:"center",background:col.white,marginBottom:12,cursor:"pointer"}}onClick={()=>document.getElementById("logo-upload-input")?.click()}>{spLogo?<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}><img src={spLogo}alt="Logo preview"style={{maxWidth:"100%",maxHeight:120,borderRadius:4,objectFit:"contain"}}/><p style={{fontSize:12,color:col.g600}}>Haz clic para cambiar</p></div>:<div><p style={{fontSize:24,marginBottom:8}}>📤</p><p style={{fontSize:12,color:col.g600}}>Haz clic para cargar logo</p></div>}</div><input id="logo-upload-input"type="file"accept="image/*"onChange={e=>{const file=e.target.files?.[0];if(file){const reader=new FileReader();reader.onload=()=>setSpLogo(reader.result);reader.readAsDataURL(file);}}}style={{display:"none"}}/><button onClick={()=>document.getElementById("logo-upload-input")?.click()}style={{width:"100%",padding:"10px",background:col.espresso,color:col.cream,border:"none",borderRadius:4,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all 0.2s",marginBottom:8}}onMouseEnter={e=>e.currentTarget.style.background=col.brown}onMouseLeave={e=>e.currentTarget.style.background=col.espresso}>📤 {spLogo?"Cambiar Logo":"Subir Logo"}</button>{spLogo&&<button onClick={()=>{const t=document.createElement("div");t.style.cssText="position:fixed;bottom:20px;right:20px;background:#7A8C6E;color:#fff;padding:16px 24px;borderRadius:8px;fontSize:14px;zIndex:10000;animation:fadeUp 0.3s ease;fontWeight:500;";t.textContent="✓ Logo guardado correctamente";document.body.appendChild(t);setTimeout(()=>t.remove(),2500)}}style={{width:"100%",padding:"10px",background:C.sage,color:col.white,border:"none",borderRadius:4,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all 0.2s"}}onMouseEnter={e=>e.currentTarget.style.opacity="0.8"}onMouseLeave={e=>e.currentTarget.style.opacity="1"}>✓ Guardar Logo</button>}</div><div><Lbl>Color Primario</Lbl><input type="color"value="#8B6F5E"style={{width:"100%",height:40,border:`1px solid ${col.sand}`,borderRadius:4,cursor:"pointer"}}/></div><div><Lbl>Modo White Label</Lbl><label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}><input type="checkbox"style={{cursor:"pointer"}}/>Habilitar White Label (oculta nombre de marca)</label></div></div></Card></div>}
      </div>}
    </main>
    {modal?.type==="detail"&&<AptDetailModal apt={modal.data}services={services}professionals={professionals}appointments={appointments}onClose={()=>setModal(null)}onUpdateStatus={updateStatus}onReschedule={doReschedule}/>}
    {modal?.type==="addService"&&<Modal title="Nuevo Servicio"onClose={()=>setModal(null)}><AddServiceForm compressImage={compressImage}onClose={()=>setModal(null)}onSave={data=>{setServices(p=>[...p,{...data,id:Date.now(),active:true}]);setModal(null);}}/></Modal>}
    {modal?.type==="addPro"&&<Modal title="Nueva Profesional"onClose={()=>setModal(null)}><AddProForm onClose={()=>setModal(null)}onSave={data=>{setProfessionals(p=>[...p,{...data,id:Date.now(),active:true}]);setModal(null);}}/></Modal>}
    {imgToast&&<Toast msg={imgToast.msg}type={imgToast.type}/>}
  </div>;
}

/* ═══════════════════════════ APT DETAIL MODAL ══════════════════════════ */
function AptDetailModal({apt,services,professionals,appointments,onClose,onUpdateStatus,onReschedule}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const svc=services.find(s=>s.id===apt.serviceId);const pro=professionals.find(p=>p.id===apt.professionalId);
  const[reschedMode,setReschedMode]=useState(false);const[newDate,setNewDate]=useState(apt.date);const[newTime,setNewTime]=useState("");const[notes,setNotes]=useState(apt.notes||"");
  const slots=useMemo(()=>{if(!newDate)return[];return getSlots(apt.serviceId,apt.professionalId,newDate,appointments.filter(a=>a.id!==apt.id),services,professionals);},[newDate,appointments,services,professionals,apt]);
  return<Modal title={t.admin.detail}onClose={onClose}>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <dl>{[[t.admin.client,apt.clientName],[t.admin.phone,apt.clientPhone||"—"],[t.admin.email,apt.clientEmail],[t.admin.service,svc?.name],[t.admin.duration,`${svc?.duration} ${t.min}`],[t.admin.professional,pro?.name],[t.admin.dateTime,`${apt.date} · ${apt.time}`],[t.admin.statusLbl,<Tag key="t"status={apt.status}/>]].map(([k,v])=><div key={k}style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${col.sand}`}}><dt style={{fontSize:13,color:col.g600}}>{k}</dt><dd style={{fontSize:13,fontWeight:400,color:col.espresso}}>{v}</dd></div>)}</dl>
      <div><Lbl>{t.admin.notes}</Lbl><textarea value={notes}onChange={e=>setNotes(e.target.value)}rows={2}aria-label={t.admin.notes}style={{width:"100%",border:`1px solid ${col.sand}`,borderRadius:4,padding:"10px 14px",fontSize:13,resize:"vertical",fontFamily:"DM Sans,sans-serif",color:col.espresso,background:col.white}}placeholder={t.admin.notesPlaceholder}/></div>
      {!reschedMode&&<div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:4}}>
        {apt.status==="pending"&&<Btn variant="success"onClick={()=>onUpdateStatus(apt.id,"confirmed",notes)}>{t.admin.doConfirm}</Btn>}
        {(apt.status==="confirmed"||apt.status==="rescheduled")&&<Btn variant="success"onClick={()=>onUpdateStatus(apt.id,"attended",notes)}>{t.admin.doAttended}</Btn>}
        {apt.status!=="cancelled"&&apt.status!=="attended"&&<><Btn variant="secondary"onClick={()=>setReschedMode(true)}>{t.admin.doReschedule}</Btn><Btn variant="danger"onClick={()=>onUpdateStatus(apt.id,"cancelled",notes)}>{t.admin.doCancel}</Btn></>}
        {(apt.status==="cancelled"||apt.status==="attended")&&<Btn variant="secondary"onClick={()=>onUpdateStatus(apt.id,"confirmed",notes)}>{t.admin.restore}</Btn>}
      </div>}
      {reschedMode&&<div style={{border:`1px solid ${col.sand}`,borderRadius:6,padding:16}}>
        <h4 style={{fontWeight:500,marginBottom:14,color:col.espresso}}>{t.admin.newDate}</h4>
        <Input label={t.admin.newDateLbl}type="date"value={newDate}min={todayStr()}onChange={e=>{setNewDate(e.target.value);setNewTime("");}}/>
        {newDate&&<div style={{marginTop:12}}><Lbl>{t.booking.availableSlots}</Lbl>{slots.length===0?<p style={{fontSize:13,color:col.g400}}>{t.booking.noSlots}</p>:<div style={{display:"flex",flexWrap:"wrap",gap:6}}>{slots.map(sl=><button key={sl}onClick={()=>setNewTime(sl)}aria-pressed={newTime===sl}style={{padding:"6px 12px",borderRadius:3,fontSize:12,cursor:"pointer",fontFamily:"DM Sans,sans-serif",border:`1px solid ${newTime===sl?col.brown:col.sand}`,background:newTime===sl?col.espresso:col.white,color:newTime===sl?col.cream:col.espresso}}>{sl}</button>)}</div>}</div>}
        <div style={{display:"flex",gap:8,marginTop:14}}><Btn variant="secondary"onClick={()=>setReschedMode(false)}>{t.admin.cancelResched}</Btn><Btn onClick={()=>newTime&&onReschedule(apt.id,newDate,newTime)}style={{opacity:newTime?1:0.4}}>{t.admin.confirmResched}</Btn></div>
      </div>}
      {apt.history?.length>0&&<div style={{marginTop:8}}><Lbl>{t.admin.trace}</Lbl><ul style={{listStyle:"none"}}>{apt.history.map((h,i)=><li key={i}style={{fontSize:12,color:col.g600,paddingBottom:4}}>• {h.action} — {h.at}</li>)}</ul></div>}
    </div>
  </Modal>;
}

function AddServiceForm({compressImage,onClose,onSave}){const{t}=useLang();const{hc}=useA11y();const col=cc(hc);const[f,setF]=useState({name:"",category:"Masajes",duration:"60",price:"0",image:null});const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));return<div style={{display:"flex",flexDirection:"column",gap:16}}><Input label={t.admin.serviceName}value={f.name}onChange={s("name")}placeholder="Nombre del servicio"/><Sel label={t.admin.category}value={f.category}onChange={s("category")}>{["Masajes","Manicure","Pedicure","Depilación","Facial","Otro"].map(c=><option key={c}value={c}>{t.categories[c]||c}</option>)}</Sel><Input label={t.admin.durationMin}type="number"value={f.duration}onChange={s("duration")}/><Input label={t.admin.price}type="number"value={f.price}onChange={s("price")}/><div><Lbl>Imagen del Servicio</Lbl><div style={{border:`2px dashed ${col.sand}`,borderRadius:6,padding:12,textAlign:"center",background:col.white,marginBottom:8}}>{f.image?<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}><img src={f.image}alt="Service preview"style={{maxWidth:"100%",maxHeight:80,borderRadius:4,objectFit:"contain"}}/><p style={{fontSize:11,color:col.g600}}>Click para cambiar</p></div>:<p style={{fontSize:12,color:col.g600}}>No hay imagen. Click para subir</p>}<input type="file"accept="image/*"onChange={async e=>{const file=e.target.files?.[0];if(file&&compressImage){const compressed=await compressImage(file,600,0.75);setF(p=>({...p,image:compressed}))}}}style={{position:"absolute",width:0,height:0,opacity:0}}/></div><button onClick={()=>{document.querySelector('input[type="file"]')?.click()}}style={{width:"100%",padding:"8px",background:col.espresso,color:col.cream,border:"none",borderRadius:4,fontSize:12,cursor:"pointer",marginBottom:8}}>📤 {f.image?"Cambiar Imagen":"Subir Imagen"}</button></div><div style={{display:"flex",gap:12,marginTop:8}}><Btn variant="secondary"onClick={onClose}>{t.admin.cancel}</Btn><Btn onClick={()=>f.name&&onSave({...f,duration:Number(f.duration),price:Number(f.price)})}>{t.admin.save}</Btn></div></div>;}

function AddProForm({onClose,onSave}){const{t}=useLang();const[f,setF]=useState({name:"",specialty:"",scheduleStart:"08:00",scheduleEnd:"17:00"});const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));return<div style={{display:"flex",flexDirection:"column",gap:16}}><Input label={t.admin.proName}value={f.name}onChange={s("name")}placeholder="Nombre completo"/><Input label={t.admin.specialty}value={f.specialty}onChange={s("specialty")}placeholder="Ej: Masajes & Facial"/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><Input label={t.admin.startTime}type="time"value={f.scheduleStart}onChange={s("scheduleStart")}/><Input label={t.admin.endTime}type="time"value={f.scheduleEnd}onChange={s("scheduleEnd")}/></div><div style={{display:"flex",gap:12,marginTop:8}}><Btn variant="secondary"onClick={onClose}>{t.admin.cancel}</Btn><Btn onClick={()=>f.name&&onSave(f)}>{t.admin.save}</Btn></div></div>;}

/* ═══════════════════════════ STORAGE UTILITIES ══════════════════════════ */
const getFromStorage=(key,defaultValue)=>{try{const item=localStorage.getItem(key);return item?JSON.parse(item):defaultValue;}catch{return defaultValue;}};
const saveToStorage=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};

/* ═══════════════════════════ ROOT APP ══════════════════════════════════ */
export default function App(){
  const[lang,setLang]=useState("es");
  const[fontSize,setFontSize]=useState(16);
  const[hc,setHc]=useState(false);
  const[user,setUser]=useState(null);
  const[page,setPage]=useState("home");
  const[appointments,setAppointments]=useState(()=>getFromStorage("aura_appointments",APPOINTMENTS_SEED));
  const[services,setServices]=useState(()=>getFromStorage("aura_services",SERVICES_SEED));
  const[professionals,setProfessionals]=useState(()=>getFromStorage("aura_professionals",PROFESSIONALS_SEED));
  const[users,setUsers]=useState(()=>getFromStorage("aura_users",USERS_SEED));
  const[companyData,setCompanyData]=useState(()=>getFromStorage("aura_company",{address:"Cra. 5 #120-45\nBogota, Colombia\nZona Rosa - Chapinero",phone:"+57 (300) 123-4567",email:"info@auraspa.com",city:"Bogotá",state:"Bogotá",weekStart:"09:00",weekEnd:"20:00",satStart:"09:00",satEnd:"18:00",sunStart:"10:00",sunEnd:"17:00"}));
  const[spLogo,setSpLogo]=useState(()=>getFromStorage("aura_logo",null));
  const[landingImages,setLandingImages]=useState(()=>getFromStorage("aura_landing_images",{section1:null,section2:null,section3:null}));
  const[carouselImages,setCarouselImages]=useState(()=>getFromStorage("aura_carousel_images",[null,null,null,null,null]));
  const t=TR[lang];
  
  // Persistencia en localStorage
  useEffect(()=>{saveToStorage("aura_appointments",appointments);},[appointments]);
  useEffect(()=>{saveToStorage("aura_services",services);},[services]);
  useEffect(()=>{saveToStorage("aura_professionals",professionals);},[professionals]);
  useEffect(()=>{saveToStorage("aura_users",users);},[users]);
  useEffect(()=>{saveToStorage("aura_company",companyData);},[companyData]);
  useEffect(()=>{saveToStorage("aura_logo",spLogo);},[spLogo]);
  useEffect(()=>{saveToStorage("aura_landing_images",landingImages);},[landingImages]);
  useEffect(()=>{saveToStorage("aura_carousel_images",carouselImages);},[carouselImages]);

  const handleLogin=u=>{setUser(u);setPage(u.role==="admin"?"admin":"home");};
  const handleLogout=()=>{const toast=document.createElement("div");toast.style.cssText="position:fixed;bottom:20px;right:20px;background:#3D2B24;color:#FAF7F2;padding:16px 24px;borderRadius:8px;fontSize:14px;zIndex:10000;animation:fadeUp 0.3s ease;";toast.textContent="Sesión finalizada";document.body.appendChild(toast);setTimeout(()=>{toast.remove();},2000);setUser(null);setPage("home");};

  // keep logged-in user in sync with users list
  useEffect(()=>{if(user){const fresh=users.find(u=>u.id===user.id);if(fresh&&(fresh.name!==user.name||fresh.email!==user.email))setUser(fresh);}},[ users]);

  // Detectar token de recuperación en la URL
  useEffect(()=>{
    const urlParams=new URLSearchParams(window.location.search);
    const token=urlParams.get("token");
    if(token){
      setPage("reset-password");
    }
  },[]);

  let aboutTab=null,actualPage=page;
  if(page.startsWith("about-")){actualPage="about";aboutTab=page.replace("about-","");}
  if(page==="contactanos"){actualPage="contactanos";}

  const isAdminFull=actualPage==="admin"&&user?.role==="admin";

  const renderPage=()=>{
    if(isAdminFull)return<AdminPortal user={user}appointments={appointments}setAppointments={setAppointments}services={services}setServices={setServices}professionals={professionals}setProfessionals={setProfessionals}users={users}setUsers={setUsers}setPage={setPage}companyData={companyData}setCompanyData={setCompanyData}spLogo={spLogo}setSpLogo={setSpLogo}landingImages={landingImages}setLandingImages={setLandingImages}carouselImages={carouselImages}setCarouselImages={setCarouselImages}/>;
    if(actualPage==="login")return<AuthScreen onLogin={handleLogin}setPage={setPage}initMode="login"users={users}setUsers={setUsers}/>;
    if(actualPage==="register")return<AuthScreen onLogin={handleLogin}setPage={setPage}initMode="register"users={users}setUsers={setUsers}/>;
    if(actualPage==="recover-password")return<RecoverPasswordScreen setPage={setPage}users={users}/>;
    if(actualPage==="reset-password"){const urlParams=new URLSearchParams(window.location.search);const token=urlParams.get("token");return<ResetPasswordScreen token={token}setPage={setPage}users={users}setUsers={setUsers}/>;}
    if(actualPage==="about")return<AboutPage setPage={setPage}initialTab={aboutTab}/>;
    if(actualPage==="contactanos")return<ContactPageNew setPage={setPage}companyData={companyData}/>;
    if(actualPage==="contact")return<ContactPage setPage={setPage}/>;
    if(actualPage==="services-page")return<ServicesPage setPage={setPage}services={services}/>;
    if(actualPage==="profile"){if(!user)return<AuthScreen onLogin={handleLogin}setPage={setPage}initMode="login"users={users}setUsers={setUsers}/>;return<ProfilePage user={user}setUser={setUser}appointments={appointments}users={users}setUsers={setUsers}setPage={setPage}/>;}
    if(actualPage==="book"){if(!user)return<AuthScreen onLogin={handleLogin}setPage={setPage}initMode="login"users={users}setUsers={setUsers}/>;return<BookingFlow user={user}appointments={appointments}setAppointments={setAppointments}services={services}professionals={professionals}setPage={setPage}/>;}
    if(actualPage==="history"){if(!user)return<AuthScreen onLogin={handleLogin}setPage={setPage}initMode="login"users={users}setUsers={setUsers}/>;return<HistoryPage user={user}appointments={appointments}setAppointments={setAppointments}services={services}professionals={professionals}setPage={setPage}/>;}
    return<LandingPage setPage={setPage}services={services}landingImages={landingImages}carouselImages={carouselImages}/>;
  };

  return<LangCtx.Provider value={{t,lang}}><A11yCtx.Provider value={{fontSize,setFontSize,hc,setHc}}>
    <GlobalStyle fontSize={fontSize}highContrast={hc}/>
    <a href="#main-content"className="skip-link"onClick={e=>{e.preventDefault();document.getElementById("main-content")?.focus();}}>{t.accessibility.skip}</a>
    <AccessibilityBar/>
    <div style={{display:"flex",flexDirection:"column",flex:1,width:"100%",height:"100%"}}>
      {!isAdminFull&&<Navbar user={user}page={actualPage}setPage={setPage}onLogout={handleLogout}lang={lang}setLang={setLang}spLogo={spLogo}/>}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"auto",width:"100%"}}>
        {renderPage()}
      </div>
      {!isAdminFull&&<Footer setPage={setPage}spLogo={spLogo}/>}
    </div>
  </A11yCtx.Provider></LangCtx.Provider>;
}
