import { useState, useMemo, useEffect, useRef, createContext, useContext } from "react";

/* ═══════════════════════════ TRANSLATIONS ══════════════════════════════ */
const TR = {
  es: {
    brand:"Aura Spa",
    nav:{ home:"Inicio",services:"Nuestros Servicios",about:"Acerca de",login:"Iniciar sesión",register:"Registrarse",logout:"Cerrar sesión",myApts:"Mis Citas",book:"Reservar",profile:"Mi Perfil" },
    hero:{ title:"Bienestar que transforma",sub:"Descubre una experiencia de spa diseñada para ti. Reserva tu cita en minutos.",cta:"Reservar ahora",ctaSecondary:"Ver servicios" },
    servicesSection:{ title:"Nuestros Servicios",sub:"Tratamientos de alta calidad para tu cuerpo y mente" },
    about:{ title:"Acerca de Aura Spa",missionTitle:"Misión",missionText:"Brindar experiencias de bienestar y estética de alta calidad, en un ambiente tranquilo y seguro, promoviendo el cuidado integral de nuestros clientes a través de servicios personalizados y profesionales.",visionTitle:"Visión",visionText:"Ser el spa de referencia en Colombia, reconocido por la excelencia en nuestros servicios, el compromiso con el bienestar de nuestros clientes y la formación continua de nuestro equipo profesional.",dataTitle:"Política de Tratamiento de Datos Personales",dataText:"En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, Aura Spa garantiza la protección de los datos personales de sus clientes. Los datos recopilados (nombre, correo, teléfono) son utilizados exclusivamente para la gestión de citas. El titular podrá ejercer sus derechos ARCO mediante solicitud a privacidad@auraspa.com. No se cederán datos a terceros sin consentimiento expreso.",termsTitle:"Términos y Condiciones",termsText:"Al utilizar la plataforma Aura Spa, el usuario acepta estos términos. Las citas deben cancelarse con mínimo 2 horas de anticipación. Aura Spa se reserva el derecho de reprogramar citas en casos de fuerza mayor. Los precios son de referencia y pueden variar.",cookiesTitle:"Política de Cookies",cookiesText:"Aura Spa utiliza cookies técnicas estrictamente necesarias para la gestión de sesión. No se utilizan cookies de rastreo ni publicidad de terceros. Al continuar navegando aceptas estas cookies esenciales." },
    booking:{ title:"Reservar Cita",selectService:"Nuestros Servicios",selectServiceSub:"Selecciona el servicio que deseas",selectSchedule:"Horario",selectScheduleSub:"Elige profesional, fecha y hora",confirm:"Confirmar Reserva",confirmSub:"Revisa los detalles antes de confirmar",success:"¡Cita Confirmada!",successSub:"Tu reserva ha sido registrada.",newBook:"Nueva reserva",viewApts:"Ver mis citas",professional:"Profesional",selectPro:"Selecciona una terapeuta",date:"Fecha",availableSlots:"Horarios disponibles",noSlots:"Sin disponibilidad para esta fecha.",continue:"Continuar →",modify:"Modificar",confirmBtn:"Confirmar cita",back:"← Volver" },
    history:{ title:"Mis Citas",sub:"Historial de reservas",empty:"No tienes citas registradas aún.",firstBook:"Hacer primera reserva" },
    status:{ pending:"Pendiente",confirmed:"Confirmada",cancelled:"Cancelada",attended:"Atendida",rescheduled:"Reprogramada" },
    cancelModal:{ title:"Cancelar cita",body:"¿Confirmas que deseas cancelar esta cita?",yes:"Sí, cancelar",no:"No, conservar" },
    accessibility:{ skip:"Ir al contenido principal",increase:"Aumentar texto",decrease:"Disminuir texto",highContrast:"Alto contraste",resetAccess:"Restablecer" },
    min:"min",lang:"ES",
    categories:{ Masajes:"Masajes",Manicure:"Manicure",Pedicure:"Pedicure",Depilación:"Depilación",Facial:"Facial",Otro:"Otro" },
    footer:{ rights:"© 2025 Aura Spa. Todos los derechos reservados.",data:"Datos Personales",terms:"Términos",cookies:"Cookies" },
    admin:{ summary:"Resumen",appointments:"Citas",services:"Servicios",professionals:"Profesionales",users:"Usuarios",today:"Citas hoy",confirmed:"Confirmadas",pending:"Pendientes",attended:"Atendidas",cancelled:"Canceladas",agenda:"Agenda de hoy",noToday:"Sin citas para hoy.",manage:"Gestionar",allFilter:"Todas",noFilter:"Sin citas con este filtro.",newService:"+ Nuevo servicio",newPro:"+ Nueva terapeuta",activeApts:"citas activas",detail:"Detalle de Cita",client:"Cliente",phone:"Teléfono",email:"Correo",service:"Servicio",duration:"Duración",professional:"Profesional",dateTime:"Fecha y hora",statusLbl:"Estado",notes:"Observaciones",notesPlaceholder:"Notas internas...",doConfirm:"✓ Confirmar",doAttended:"✓ Atendida",doReschedule:"🗓 Reprogramar",doCancel:"✕ Cancelar",restore:"Restaurar",trace:"Trazabilidad",newDate:"Nueva fecha y hora",newDateLbl:"Fecha",confirmResched:"Confirmar reprogramación",cancelResched:"Cancelar",serviceName:"Nombre *",category:"Categoría",durationMin:"Duración (min)",price:"Precio COP",save:"Guardar",cancel:"Cancelar",proName:"Nombre *",specialty:"Especialidad",startTime:"Inicio jornada",endTime:"Fin jornada",active:"Activo",inactive:"Inactivo",activeF:"Activa",inactiveF:"Inactiva",adminPanel:"Panel Admin" },
    profile:{ title:"Mi Perfil",subtitle:"Gestiona tu información personal",name:"Nombre completo",emailLbl:"Correo electrónico",phoneLbl:"Teléfono",roleLbl:"Rol",roleAdmin:"Administrador",roleClient:"Cliente",roleProfessional:"Terapeuta",memberSince:"Miembro desde",totalApts:"Citas totales",attendedApts:"Atendidas",editProfile:"Editar perfil",saveChanges:"Guardar cambios",cancel:"Cancelar",changePassword:"Cambiar contraseña",currentPwd:"Contraseña actual",newPwd:"Nueva contraseña",confirmNewPwd:"Confirmar nueva contraseña",pwdChanged:"Contraseña actualizada.",pwdWrong:"Contraseña actual incorrecta.",pwdMismatch:"Las contraseñas no coinciden.",profileUpdated:"Perfil actualizado.",usersTitle:"Gestión de Usuarios",usersSubtitle:"Administra todos los usuarios del sistema",newUser:"+ Nuevo usuario",editUser:"Editar",deleteUser:"Eliminar",cantDeleteSelf:"No puedes eliminar tu propia cuenta.",cantDeleteLast:"Debe existir al menos un administrador.",userSaved:"Usuario guardado.",userExists:"Este correo ya está registrado.",confirmDelete:"¿Eliminar usuario?",confirmDeleteBody:"Esta acción no se puede deshacer.",yes:"Sí, eliminar",no:"Cancelar",usersCount:"usuarios registrados",allRoles:"Todos los roles",noUsers:"Sin usuarios con este filtro.",passwordLbl:"Contraseña",roleAssigned:"Rol asignado",searchUser:"Buscar usuario..." },
    auth:{ login:"Iniciar sesión",register:"Registrarse",email:"Correo *",password:"Contraseña *",confirmPwd:"Confirmar contraseña *",name:"Nombre *",phone:"Teléfono",enter:"Ingresar",create:"Crear cuenta",wrongCreds:"Credenciales incorrectas.",fillAll:"Completa todos los campos.",pwdMismatch:"Las contraseñas no coinciden.",emailUsed:"Correo ya registrado.",demo:"Demo — admin: admin@auraspa.com / admin123  |  cliente: cliente@email.com / cliente123" },
  },
  en: {
    brand:"Aura Spa",
    nav:{ home:"Home",services:"Our Services",about:"About",login:"Sign in",register:"Sign up",logout:"Sign out",myApts:"My Appointments",book:"Book",profile:"My Profile" },
    hero:{ title:"Wellness that transforms",sub:"Discover a spa experience designed for you. Book your appointment in minutes.",cta:"Book now",ctaSecondary:"View services" },
    servicesSection:{ title:"Our Services",sub:"High-quality treatments for your body and mind" },
    about:{ title:"About Aura Spa",missionTitle:"Mission",missionText:"To provide high-quality wellness and aesthetic experiences in a calm and safe environment, promoting the comprehensive care of our clients through personalized and professional services.",visionTitle:"Vision",visionText:"To be Colombia's reference spa, recognized for excellence in services, commitment to client wellbeing, and continuous professional development.",dataTitle:"Personal Data Protection Policy",dataText:"In compliance with Colombian Law 1581 of 2012, Aura Spa ensures the protection of its clients' personal data. Data collected is used exclusively for appointment management. Data subjects may exercise ARCO rights by written request to privacidad@auraspa.com.",termsTitle:"Terms & Conditions",termsText:"By using the Aura Spa platform, the user accepts these terms. Appointments must be cancelled at least 2 hours in advance. Aura Spa reserves the right to reschedule in cases of force majeure. Prices are for reference and may vary.",cookiesTitle:"Cookie Policy",cookiesText:"Aura Spa uses strictly necessary cookies for session management. No tracking or third-party advertising cookies are used. Continuing to browse implies acceptance of these essential cookies." },
    booking:{ title:"Book Appointment",selectService:"Our Services",selectServiceSub:"Select the service you want",selectSchedule:"Schedule",selectScheduleSub:"Choose professional, date and time",confirm:"Confirm Booking",confirmSub:"Review the details before confirming",success:"Appointment Confirmed!",successSub:"Your booking has been registered.",newBook:"New booking",viewApts:"View my appointments",professional:"Professional",selectPro:"Select a therapist",date:"Date",availableSlots:"Available slots",noSlots:"No availability for this date.",continue:"Continue →",modify:"Modify",confirmBtn:"Confirm appointment",back:"← Back" },
    history:{ title:"My Appointments",sub:"Booking history",empty:"You have no appointments yet.",firstBook:"Make first booking" },
    status:{ pending:"Pending",confirmed:"Confirmed",cancelled:"Cancelled",attended:"Attended",rescheduled:"Rescheduled" },
    cancelModal:{ title:"Cancel appointment",body:"Are you sure you want to cancel?",yes:"Yes, cancel",no:"No, keep it" },
    accessibility:{ skip:"Skip to main content",increase:"Increase text",decrease:"Decrease text",highContrast:"High contrast",resetAccess:"Reset" },
    min:"min",lang:"EN",
    categories:{ Masajes:"Massages",Manicure:"Manicure",Pedicure:"Pedicure",Depilación:"Hair removal",Facial:"Facial",Otro:"Other" },
    footer:{ rights:"© 2025 Aura Spa. All rights reserved.",data:"Personal Data",terms:"Terms",cookies:"Cookies" },
    admin:{ summary:"Summary",appointments:"Appointments",services:"Services",professionals:"Professionals",users:"Users",today:"Today's apts",confirmed:"Confirmed",pending:"Pending",attended:"Attended",cancelled:"Cancelled",agenda:"Today's agenda",noToday:"No appointments today.",manage:"Manage",allFilter:"All",noFilter:"No appointments with this filter.",newService:"+ New service",newPro:"+ New therapist",activeApts:"active apts",detail:"Appointment Detail",client:"Client",phone:"Phone",email:"Email",service:"Service",duration:"Duration",professional:"Professional",dateTime:"Date & time",statusLbl:"Status",notes:"Notes",notesPlaceholder:"Internal notes...",doConfirm:"✓ Confirm",doAttended:"✓ Mark Attended",doReschedule:"🗓 Reschedule",doCancel:"✕ Cancel",restore:"Restore",trace:"History",newDate:"New date & time",newDateLbl:"Date",confirmResched:"Confirm reschedule",cancelResched:"Cancel",serviceName:"Name *",category:"Category",durationMin:"Duration (min)",price:"Price COP",save:"Save",cancel:"Cancel",proName:"Name *",specialty:"Specialty",startTime:"Start time",endTime:"End time",active:"Active",inactive:"Inactive",activeF:"Active",inactiveF:"Inactive",adminPanel:"Admin Panel" },
    profile:{ title:"My Profile",subtitle:"Manage your personal information",name:"Full name",emailLbl:"Email address",phoneLbl:"Phone",roleLbl:"Role",roleAdmin:"Administrator",roleClient:"Client",roleProfessional:"Therapist",memberSince:"Member since",totalApts:"Total appointments",attendedApts:"Attended",editProfile:"Edit profile",saveChanges:"Save changes",cancel:"Cancel",changePassword:"Change password",currentPwd:"Current password",newPwd:"New password",confirmNewPwd:"Confirm new password",pwdChanged:"Password updated.",pwdWrong:"Current password is incorrect.",pwdMismatch:"Passwords do not match.",profileUpdated:"Profile updated.",usersTitle:"User Management",usersSubtitle:"Manage all system users",newUser:"+ New user",editUser:"Edit",deleteUser:"Delete",cantDeleteSelf:"You cannot delete your own account.",cantDeleteLast:"At least one administrator must exist.",userSaved:"User saved.",userExists:"Email already registered.",confirmDelete:"Delete user?",confirmDeleteBody:"This action cannot be undone.",yes:"Yes, delete",no:"Cancel",usersCount:"registered users",allRoles:"All roles",noUsers:"No users with this filter.",passwordLbl:"Password",roleAssigned:"Assigned role",searchUser:"Search user..." },
    auth:{ login:"Sign in",register:"Sign up",email:"Email *",password:"Password *",confirmPwd:"Confirm password *",name:"Full name *",phone:"Phone",enter:"Sign in",create:"Create account",wrongCreds:"Incorrect credentials.",fillAll:"Please fill all required fields.",pwdMismatch:"Passwords do not match.",emailUsed:"Email already registered.",demo:"Demo — admin: admin@auraspa.com / admin123  |  client: cliente@email.com / cliente123" },
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
    html{font-size:${fontSize}px;scroll-behavior:smooth;}
    body{font-family:'DM Sans',sans-serif;background:${hc?'#000':'#FAF7F2'};color:${hc?'#fff':'#3D2B24'};line-height:1.6;}
    ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:#E8DDD0;}::-webkit-scrollbar-thumb{background:#C4B5A5;border-radius:3px;}
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

/* ═══════════════════════════ SEED DATA ════════════════════════════════ */
const SERVICES_SEED=[
  {id:1,name:"Masaje Relajante",category:"Masajes",duration:60,price:120000,active:true},
  {id:2,name:"Masaje Descontracturante",category:"Masajes",duration:90,price:160000,active:true},
  {id:3,name:"Manicure Clásico",category:"Manicure",duration:45,price:35000,active:true},
  {id:4,name:"Pedicure Spa",category:"Pedicure",duration:60,price:55000,active:true},
  {id:5,name:"Depilación Piernas",category:"Depilación",duration:45,price:70000,active:true},
  {id:6,name:"Facial Hidratante",category:"Facial",duration:60,price:95000,active:true},
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
function Navbar({user,page,setPage,onLogout,lang,setLang}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[menuOpen,setMenuOpen]=useState(false);
  const navLinks=user
    ?(user.role==="admin"
        ?[{id:"admin",label:t.nav.home}]
        :[{id:"home",label:t.nav.home},{id:"services-page",label:t.nav.services},{id:"about",label:t.nav.about},{id:"book",label:t.nav.book},{id:"history",label:t.nav.myApts}])
    :[{id:"home",label:t.nav.home},{id:"services-page",label:t.nav.services},{id:"about",label:t.nav.about}];
  return<header role="banner"style={{background:col.white,borderBottom:`1px solid ${col.sand}`,position:"sticky",top:0,zIndex:200}}>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
      <button onClick={()=>setPage("home")}aria-label="Ir a inicio"style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"baseline",gap:6}}>
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
function Footer({setPage}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  return<footer role="contentinfo"style={{background:col.espresso,color:col.cream,padding:"32px 20px",marginTop:60}}>
    <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
      <div><p className="display"style={{fontSize:22,fontWeight:300,marginBottom:4}}>Aura Spa</p><p style={{fontSize:12,color:col.taupe}}>{t.footer.rights}</p></div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        {[["about-data",t.footer.data],["about-terms",t.footer.terms],["about-cookies",t.footer.cookies]].map(([pg,lbl])=>(
          <button key={pg}onClick={()=>setPage(pg)}style={{background:"none",border:"none",color:col.taupe,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>{lbl}</button>
        ))}
      </div>
    </div>
  </footer>;
}

/* ═══════════════════════════ LANDING ══════════════════════════════════ */
function LandingPage({setPage,services}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  return<main id="main-content"tabIndex={-1}>
    <section aria-labelledby="hero-title"style={{background:hc?"#000":`linear-gradient(135deg,${col.espresso} 0%,#5C3D31 60%,#8B6F5E 100%)`,padding:"80px 20px",textAlign:"center",position:"relative",overflow:"hidden"}}>
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
    <section aria-labelledby="services-title"style={{padding:"60px 20px",maxWidth:1100,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <h2 id="services-title"className="display"style={{fontSize:36,fontWeight:300,marginBottom:8,color:col.espresso}}>{t.servicesSection.title}</h2>
        <p style={{color:col.g600}}>{t.servicesSection.sub}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20}}>
        {services.filter(s=>s.active).map((svc,i)=>(
          <Card key={svc.id}style={{padding:24,textAlign:"center",cursor:"pointer",transition:"all 0.2s"}}className="anim-fadeup"onClick={()=>setPage("book")}role="button"tabIndex={0}onKeyDown={e=>e.key==="Enter"&&setPage("book")}aria-label={`${svc.name}, ${svc.duration} ${t.min}, ${fmt(svc.price)}`}>
            <div style={{fontSize:36,marginBottom:14}}>{EMOJI[svc.category]||"🌿"}</div>
            <h3 style={{fontSize:15,fontWeight:500,marginBottom:6,color:col.espresso}}>{svc.name}</h3>
            <p style={{fontSize:12,color:col.g600,marginBottom:4}}>{svc.duration} {t.min}</p>
            <p style={{fontSize:14,fontWeight:500,color:col.brown}}>{fmt(svc.price)}</p>
          </Card>
        ))}
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
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
          {services.filter(s=>s.category===cat&&s.active).map(svc=>(
            <Card key={svc.id}style={{padding:24,cursor:"pointer",transition:"all 0.2s"}}onClick={()=>setPage("book")}role="button"tabIndex={0}onKeyDown={e=>e.key==="Enter"&&setPage("book")}>
              <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <span style={{fontSize:28}}>{EMOJI[svc.category]||"🌿"}</span>
                <div><h4 style={{fontWeight:500,marginBottom:4,color:col.espresso}}>{svc.name}</h4><p style={{fontSize:12,color:col.g600}}>{svc.duration} {t.min}</p><p style={{fontSize:14,fontWeight:600,color:col.brown,marginTop:4}}>{fmt(svc.price)}</p></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ))}
  </main>;
}

/* ═══════════════════════════ ABOUT PAGE ════════════════════════════════ */
function AboutPage({setPage,initialTab}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const tabs=[{id:"mission",label:t.about.missionTitle},{id:"vision",label:t.about.visionTitle},{id:"data",label:"Datos"},{id:"terms",label:"Términos"},{id:"cookies",label:"Cookies"}];
  const[activeTab,setActiveTab]=useState(initialTab||"mission");
  useEffect(()=>{if(initialTab)setActiveTab(initialTab);},[initialTab]);
  const content={mission:{title:t.about.missionTitle,text:t.about.missionText,icon:"🎯"},vision:{title:t.about.visionTitle,text:t.about.visionText,icon:"🌟"},data:{title:t.about.dataTitle,text:t.about.dataText,icon:"🔒"},terms:{title:t.about.termsTitle,text:t.about.termsText,icon:"📋"},cookies:{title:t.about.cookiesTitle,text:t.about.cookiesText,icon:"🍪"}};
  const cur=content[activeTab];
  return<main id="main-content"tabIndex={-1}style={{maxWidth:1000,margin:"0 auto",padding:"40px 20px"}}>
    <BackBtn onClick={()=>setPage("home")}/>
    <h2 className="display"style={{fontSize:38,fontWeight:300,marginBottom:32,color:col.espresso}}>{t.about.title}</h2>
    <div role="tablist"style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>
      {tabs.map(tab=><button key={tab.id}role="tab"aria-selected={activeTab===tab.id}onClick={()=>setActiveTab(tab.id)}style={{padding:"8px 18px",borderRadius:20,border:`1px solid ${activeTab===tab.id?col.brown:col.sand}`,background:activeTab===tab.id?col.espresso:"transparent",color:activeTab===tab.id?col.cream:col.g600,fontSize:13,cursor:"pointer",transition:"all 0.2s",fontFamily:"DM Sans,sans-serif"}}>{tab.label}</button>)}
    </div>
    <Card key={activeTab}style={{padding:36}}className="anim-scalein"role="tabpanel">
      <div style={{fontSize:40,marginBottom:20}}>{cur.icon}</div>
      <h3 className="display"style={{fontSize:28,fontWeight:400,marginBottom:16,color:col.espresso}}>{cur.title}</h3>
      <p style={{color:col.g600,lineHeight:1.9,fontSize:15}}>{cur.text}</p>
    </Card>
  </main>;
}

/* ═══════════════════════════ AUTH SCREEN ═══════════════════════════════ */
function AuthScreen({onLogin,setPage,initMode="login",users,setUsers}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[mode,setMode]=useState(initMode);
  const[form,setForm]=useState({name:"",email:"",phone:"",password:"",confirm:""});
  const[err,setErr]=useState("");
  const s=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const login=()=>{setErr("");const u=users.find(u=>u.email===form.email&&u.password===form.password);if(!u){setErr(t.auth.wrongCreds);return;}onLogin(u);};
  const register=()=>{setErr("");if(!form.name||!form.email||!form.password){setErr(t.auth.fillAll);return;}if(form.password!==form.confirm){setErr(t.auth.pwdMismatch);return;}if(users.find(u=>u.email===form.email)){setErr(t.auth.emailUsed);return;}const u={id:Date.now(),email:form.email,password:form.password,role:"client",name:form.name,phone:form.phone,createdAt:todayStr()};setUsers(p=>[...p,u]);onLogin(u);};
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
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {mode==="register"&&<><Input label={t.auth.name}value={form.name}onChange={s("name")}placeholder="Tu nombre"/><Input label={t.auth.phone}type="tel"value={form.phone}onChange={s("phone")}placeholder="3001234567"/></>}
          <Input label={t.auth.email}type="email"value={form.email}onChange={s("email")}placeholder="correo@ejemplo.com"/>
          <Input label={t.auth.password}type="password"value={form.password}onChange={s("password")}placeholder="••••••••"/>
          {mode==="register"&&<Input label={t.auth.confirmPwd}type="password"value={form.confirm}onChange={s("confirm")}placeholder="••••••••"/>}
          {err&&<p role="alert"style={{color:"#9B1C1C",fontSize:13,background:"#FDECEA",padding:"10px 14px",borderRadius:4}}>{err}</p>}
          <Btn onClick={mode==="login"?login:register}style={{width:"100%",padding:"13px 0",fontSize:14,marginTop:4}}>{mode==="login"?t.auth.enter:t.auth.create}</Btn>
          {mode==="login"&&<p style={{fontSize:11,color:col.g400,textAlign:"center"}}>{t.auth.demo}</p>}
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
function AdminPortal({user,appointments,setAppointments,services,setServices,professionals,setProfessionals,setPage}){
  const{t}=useLang();const{hc}=useA11y();const col=cc(hc);
  const[sec,setSec]=useState("dashboard");
  const[modal,setModal]=useState(null);
  const[filter,setFilter]=useState("all");
  const today2=todayStr();
  const todayApts=appointments.filter(a=>a.date===today2);
  const stats={todayTotal:todayApts.length,confirmed:appointments.filter(a=>a.status==="confirmed").length,pending:appointments.filter(a=>a.status==="pending").length,attended:appointments.filter(a=>a.status==="attended").length,cancelled:appointments.filter(a=>a.status==="cancelled").length};
  const nav=[{id:"dashboard",label:t.admin.summary,icon:"📊"},{id:"appointments",label:t.admin.appointments,icon:"📅"},{id:"services",label:t.admin.services,icon:"✨"},{id:"professionals",label:t.admin.professionals,icon:"👩"}];
  const updateStatus=(id,status,notes="")=>{setAppointments(p=>p.map(a=>a.id===id?{...a,status,notes:notes||a.notes,history:[...(a.history||[]),{action:t.status[status],at:new Date().toLocaleString("es-CO")}]}:a));setModal(null);};
  const doReschedule=(id,date,time)=>{setAppointments(p=>p.map(a=>a.id===id?{...a,date,time,status:"rescheduled",history:[...(a.history||[]),{action:`Reprogramada a ${date} ${time}`,at:new Date().toLocaleString("es-CO")}]}:a));setModal(null);};
  const filteredApts=filter==="all"?appointments:appointments.filter(a=>a.status===filter);
  return<div style={{display:"flex",minHeight:"100vh"}}>
    <aside aria-label="Panel de navegación"style={{width:220,background:col.espresso,display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",padding:"24px 0",flexShrink:0}}>
      <div style={{padding:"0 20px 24px",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        <button onClick={()=>setPage("home")}style={{background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:0}}>
          <p className="display"style={{fontSize:22,fontWeight:400,color:col.cream}}>Aura Spa</p>
          <p style={{fontSize:11,color:col.taupe,marginTop:2,textTransform:"uppercase",letterSpacing:"0.08em"}}>{t.admin.adminPanel}</p>
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
    <main id="main-content"tabIndex={-1}style={{flex:1,padding:"32px 28px",overflow:"auto",background:col.cream}}>
      {sec==="dashboard"&&<div className="anim-fadeup">
        <h2 className="display"style={{fontSize:36,fontWeight:300,marginBottom:4,color:col.espresso}}>Resumen del Día</h2>
        <p style={{color:col.g600,marginBottom:28}}>{new Date().toLocaleDateString("es-CO",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:14,marginBottom:32}}>
          <StatCard label={t.admin.today}value={stats.todayTotal}/><StatCard label={t.admin.confirmed}value={stats.confirmed}color={C.sage}/><StatCard label={t.admin.pending}value={stats.pending}color={C.gold}/><StatCard label={t.admin.attended}value={stats.attended}color="#3730A3"/><StatCard label={t.admin.cancelled}value={stats.cancelled}color="#9B1C1C"/>
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
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14}}>
          {services.map(svc=><Card key={svc.id}style={{padding:20,opacity:svc.active?1:0.55}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontSize:11,background:col.sand,padding:"2px 8px",borderRadius:10,color:col.brown}}>{svc.category}</span><button onClick={()=>setServices(p=>p.map(s=>s.id===svc.id?{...s,active:!s.active}:s))}aria-pressed={svc.active}style={{fontSize:11,border:`1px solid ${svc.active?C.sage:col.taupe}`,background:"none",borderRadius:10,padding:"2px 8px",color:svc.active?C.sage:col.taupe,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>{svc.active?t.admin.active:t.admin.inactive}</button></div><h3 style={{fontWeight:500,marginBottom:6,color:col.espresso}}>{svc.name}</h3><p style={{fontSize:13,color:col.g600}}>{svc.duration} {t.min} · {fmt(svc.price)}</p></Card>)}
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
    </main>
    {modal?.type==="detail"&&<AptDetailModal apt={modal.data}services={services}professionals={professionals}appointments={appointments}onClose={()=>setModal(null)}onUpdateStatus={updateStatus}onReschedule={doReschedule}/>}
    {modal?.type==="addService"&&<Modal title="Nuevo Servicio"onClose={()=>setModal(null)}><AddServiceForm onClose={()=>setModal(null)}onSave={data=>{setServices(p=>[...p,{...data,id:Date.now(),active:true}]);setModal(null);}}/></Modal>}
    {modal?.type==="addPro"&&<Modal title="Nueva Profesional"onClose={()=>setModal(null)}><AddProForm onClose={()=>setModal(null)}onSave={data=>{setProfessionals(p=>[...p,{...data,id:Date.now(),active:true}]);setModal(null);}}/></Modal>}
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

function AddServiceForm({onClose,onSave}){const{t}=useLang();const[f,setF]=useState({name:"",category:"Masajes",duration:"60",price:"0"});const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));return<div style={{display:"flex",flexDirection:"column",gap:16}}><Input label={t.admin.serviceName}value={f.name}onChange={s("name")}placeholder="Nombre del servicio"/><Sel label={t.admin.category}value={f.category}onChange={s("category")}>{["Masajes","Manicure","Pedicure","Depilación","Facial","Otro"].map(c=><option key={c}value={c}>{t.categories[c]||c}</option>)}</Sel><Input label={t.admin.durationMin}type="number"value={f.duration}onChange={s("duration")}/><Input label={t.admin.price}type="number"value={f.price}onChange={s("price")}/><div style={{display:"flex",gap:12,marginTop:8}}><Btn variant="secondary"onClick={onClose}>{t.admin.cancel}</Btn><Btn onClick={()=>f.name&&onSave({...f,duration:Number(f.duration),price:Number(f.price)})}>{t.admin.save}</Btn></div></div>;}

function AddProForm({onClose,onSave}){const{t}=useLang();const[f,setF]=useState({name:"",specialty:"",scheduleStart:"08:00",scheduleEnd:"17:00"});const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));return<div style={{display:"flex",flexDirection:"column",gap:16}}><Input label={t.admin.proName}value={f.name}onChange={s("name")}placeholder="Nombre completo"/><Input label={t.admin.specialty}value={f.specialty}onChange={s("specialty")}placeholder="Ej: Masajes & Facial"/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><Input label={t.admin.startTime}type="time"value={f.scheduleStart}onChange={s("scheduleStart")}/><Input label={t.admin.endTime}type="time"value={f.scheduleEnd}onChange={s("scheduleEnd")}/></div><div style={{display:"flex",gap:12,marginTop:8}}><Btn variant="secondary"onClick={onClose}>{t.admin.cancel}</Btn><Btn onClick={()=>f.name&&onSave(f)}>{t.admin.save}</Btn></div></div>;}

/* ═══════════════════════════ ROOT APP ══════════════════════════════════ */
export default function App(){
  const[lang,setLang]=useState("es");
  const[fontSize,setFontSize]=useState(16);
  const[hc,setHc]=useState(false);
  const[user,setUser]=useState(null);
  const[page,setPage]=useState("home");
  const[appointments,setAppointments]=useState(APPOINTMENTS_SEED);
  const[services,setServices]=useState(SERVICES_SEED);
  const[professionals,setProfessionals]=useState(PROFESSIONALS_SEED);
  const[users,setUsers]=useState(USERS_SEED);
  const t=TR[lang];

  const handleLogin=u=>{setUser(u);setPage(u.role==="admin"?"admin":"home");};
  const handleLogout=()=>{setUser(null);setPage("home");};

  // keep logged-in user in sync with users list
  useEffect(()=>{if(user){const fresh=users.find(u=>u.id===user.id);if(fresh&&(fresh.name!==user.name||fresh.email!==user.email))setUser(fresh);}},[ users]);

  let aboutTab=null,actualPage=page;
  if(page.startsWith("about-")){actualPage="about";aboutTab=page.replace("about-","");}

  const isAdminFull=actualPage==="admin"&&user?.role==="admin";

  const renderPage=()=>{
    if(isAdminFull)return<AdminPortal user={user}appointments={appointments}setAppointments={setAppointments}services={services}setServices={setServices}professionals={professionals}setProfessionals={setProfessionals}setPage={setPage}/>;
    if(actualPage==="login")return<AuthScreen onLogin={handleLogin}setPage={setPage}initMode="login"users={users}setUsers={setUsers}/>;
    if(actualPage==="register")return<AuthScreen onLogin={handleLogin}setPage={setPage}initMode="register"users={users}setUsers={setUsers}/>;
    if(actualPage==="about")return<AboutPage setPage={setPage}initialTab={aboutTab}/>;
    if(actualPage==="services-page")return<ServicesPage setPage={setPage}services={services}/>;
    if(actualPage==="profile"){if(!user)return<AuthScreen onLogin={handleLogin}setPage={setPage}initMode="login"users={users}setUsers={setUsers}/>;return<ProfilePage user={user}setUser={setUser}appointments={appointments}users={users}setUsers={setUsers}setPage={setPage}/>;}
    if(actualPage==="book"){if(!user)return<AuthScreen onLogin={handleLogin}setPage={setPage}initMode="login"users={users}setUsers={setUsers}/>;return<BookingFlow user={user}appointments={appointments}setAppointments={setAppointments}services={services}professionals={professionals}setPage={setPage}/>;}
    if(actualPage==="history"){if(!user)return<AuthScreen onLogin={handleLogin}setPage={setPage}initMode="login"users={users}setUsers={setUsers}/>;return<HistoryPage user={user}appointments={appointments}setAppointments={setAppointments}services={services}professionals={professionals}setPage={setPage}/>;}
    return<LandingPage setPage={setPage}services={services}/>;
  };

  return<LangCtx.Provider value={{t,lang}}><A11yCtx.Provider value={{fontSize,setFontSize,hc,setHc}}>
    <GlobalStyle fontSize={fontSize}highContrast={hc}/>
    <a href="#main-content"className="skip-link"onClick={e=>{e.preventDefault();document.getElementById("main-content")?.focus();}}>{t.accessibility.skip}</a>
    <AccessibilityBar/>
    {!isAdminFull&&<Navbar user={user}page={actualPage}setPage={setPage}onLogout={handleLogout}lang={lang}setLang={setLang}/>}
    {renderPage()}
    {!isAdminFull&&<Footer setPage={setPage}/>}
  </A11yCtx.Provider></LangCtx.Provider>;
}
