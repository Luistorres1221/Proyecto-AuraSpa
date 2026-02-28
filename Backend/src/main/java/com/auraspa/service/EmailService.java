package com.auraspa.service;

import com.auraspa.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.logging.Logger;

@Service
public class EmailService {
    
    private static final Logger logger = Logger.getLogger(EmailService.class.getName());
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;
    
    private final JavaMailSender mailSender;
    
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    /**
     * Sends email verification token via email
     */
    public void sendVerificationEmail(User user, String token) {
        try {
            String verificationUrl = frontendUrl + "/verify-email?token=" + token;
            String htmlContent = buildVerificationEmailHtml(user.getName(), verificationUrl);
            
            sendHtmlEmail(
                    user.getEmail(),
                    "Verifica tu correo electrónico - AuraSpa",
                    htmlContent
            );
            
            logger.info("Verification email sent to: " + user.getEmail());
        } catch (Exception e) {
            logger.warning("Failed to send verification email: " + e.getMessage());
            throw new RuntimeException("Failed to send verification email", e);
        }
    }
    
    /**
     * Sends password reset token via email
     */
    public void sendPasswordResetEmail(User user, String token) {
        try {
            String resetUrl = frontendUrl + "/reset-password?token=" + token;
            String htmlContent = buildPasswordResetEmailHtml(user.getName(), resetUrl);
            
            sendHtmlEmail(
                    user.getEmail(),
                    "Restablecer tu contraseña - AuraSpa",
                    htmlContent
            );
            
            logger.info("Password reset email sent to: " + user.getEmail());
        } catch (Exception e) {
            logger.warning("Failed to send password reset email: " + e.getMessage());
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }
    
    /**
     * Sends 2FA code via email
     */
    public void send2FAEmail(User user, String code) {
        try {
            String htmlContent = build2FAEmailHtml(user.getName(), code);
            
            sendHtmlEmail(
                    user.getEmail(),
                    "Tu código de autenticación - AuraSpa",
                    htmlContent
            );
            
            logger.info("2FA email sent to: " + user.getEmail());
        } catch (Exception e) {
            logger.warning("Failed to send 2FA email: " + e.getMessage());
            throw new RuntimeException("Failed to send 2FA email", e);
        }
    }
    
    /**
     * Sends appointment confirmation email
     */
    public void sendAppointmentConfirmationEmail(String toEmail, String clientName, 
                                                 String appointmentDate, String serviceName, 
                                                 String professionalName) {
        try {
            String htmlContent = buildAppointmentEmailHtml(clientName, appointmentDate, serviceName, professionalName);
            
            sendHtmlEmail(
                    toEmail,
                    "Confirmación de cita - AuraSpa",
                    htmlContent
            );
            
            logger.info("Appointment confirmation email sent to: " + toEmail);
        } catch (Exception e) {
            logger.warning("Failed to send appointment confirmation email: " + e.getMessage());
        }
    }
    
    /**
     * Sends welcome email to new user
     */
    public void sendWelcomeEmail(User user) {
        try {
            String htmlContent = buildWelcomeEmailHtml(user.getName());
            
            sendHtmlEmail(
                    user.getEmail(),
                    "¡Bienvenido a AuraSpa! - Verificación de correo",
                    htmlContent
            );
            
            logger.info("Welcome email sent to: " + user.getEmail());
        } catch (Exception e) {
            logger.warning("Failed to send welcome email: " + e.getMessage());
        }
    }
    
    // Helper methods
    
    @SuppressWarnings("null")
    private void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        
        mailSender.send(message);
    }
    
    private String buildVerificationEmailHtml(String userName, String verificationUrl) {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "  <meta charset='UTF-8'>" +
                "  <style>" +
                "    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }" +
                "    .container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
                "    .header { background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%); color: white; padding: 20px; text-align: center; border-radius: 5px; }" +
                "    .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px; }" +
                "    .button { display: inline-block; padding: 12px 30px; background: #9b59b6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }" +
                "    .footer { font-size: 12px; color: #999; text-align: center; margin-top: 30px; }" +
                "  </style>" +
                "</head>" +
                "<body>" +
                "  <div class='container'>" +
                "    <div class='header'>" +
                "      <h1>AuraSpa</h1>" +
                "      <p>Verifica tu correo electrónico</p>" +
                "    </div>" +
                "    <div class='content'>" +
                "      <p>Hola " + userName + ",</p>" +
                "      <p>Gracias por registrarte en AuraSpa. Para completar tu registro y acceder a todas las funciones, debes verificar tu correo electrónico.</p>" +
                "      <p>Haz clic en el botón de abajo para verificar tu correo:</p>" +
                "      <center>" +
                "        <a href='" + verificationUrl + "' class='button'>Verificar Correo</a>" +
                "      </center>" +
                "      <p>O copia y pega este enlace en tu navegador:</p>" +
                "      <p><small>" + verificationUrl + "</small></p>" +
                "      <p style='color: #999; font-size: 12px;'>Este enlace expira en 24 horas.</p>" +
                "    </div>" +
                "    <div class='footer'>" +
                "      <p>&copy; 2024 AuraSpa. Todos los derechos reservados.</p>" +
                "    </div>" +
                "  </div>" +
                "</body>" +
                "</html>";
    }
    
    private String buildPasswordResetEmailHtml(String userName, String resetUrl) {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "  <meta charset='UTF-8'>" +
                "  <style>" +
                "    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }" +
                "    .container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
                "    .header { background: #ff6b6b; color: white; padding: 20px; text-align: center; border-radius: 5px; }" +
                "    .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px; }" +
                "    .button { display: inline-block; padding: 12px 30px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }" +
                "    .footer { font-size: 12px; color: #999; text-align: center; margin-top: 30px; }" +
                "  </style>" +
                "</head>" +
                "<body>" +
                "  <div class='container'>" +
                "    <div class='header'>" +
                "      <h1>Resetear Contraseña</h1>" +
                "    </div>" +
                "    <div class='content'>" +
                "      <p>Hola " + userName + ",</p>" +
                "      <p>Recibimos una solicitud para resetear tu contraseña. Si no fuiste tú, puedes ignorar este correo.</p>" +
                "      <p>Para resetear tu contraseña, haz clic en el botón de abajo:</p>" +
                "      <center>" +
                "        <a href='" + resetUrl + "' class='button'>Resetear Contraseña</a>" +
                "      </center>" +
                "      <p style='color: #999; font-size: 12px;'>Este enlace expira en 24 horas.</p>" +
                "    </div>" +
                "    <div class='footer'>" +
                "      <p>&copy; 2024 AuraSpa. Todos los derechos reservados.</p>" +
                "    </div>" +
                "  </div>" +
                "</body>" +
                "</html>";
    }
    
    private String build2FAEmailHtml(String userName, String code) {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "  <meta charset='UTF-8'>" +
                "  <style>" +
                "    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }" +
                "    .container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
                "    .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px; }" +
                "    .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px; }" +
                "    .code { background: white; border: 2px solid #4CAF50; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 5px; font-family: monospace; }" +
                "    .footer { font-size: 12px; color: #999; text-align: center; margin-top: 30px; }" +
                "  </style>" +
                "</head>" +
                "<body>" +
                "  <div class='container'>" +
                "    <div class='header'>" +
                "      <h1>Código de Autenticación</h1>" +
                "    </div>" +
                "    <div class='content'>" +
                "      <p>Hola " + userName + ",</p>" +
                "      <p>Aquí está tu código de autenticación de dos factores. Úsalo para completar tu inicio de sesión:</p>" +
                "      <div class='code'>" + code + "</div>" +
                "      <p style='color: #999; font-size: 12px; margin-top: 20px;'>Este código expira en 5 minutos.</p>" +
                "      <p style='color: #999; font-size: 12px;'>Si no solicitaste este código, ignora este correo.</p>" +
                "    </div>" +
                "    <div class='footer'>" +
                "      <p>&copy; 2024 AuraSpa. Todos los derechos reservados.</p>" +
                "    </div>" +
                "  </div>" +
                "</body>" +
                "</html>";
    }
    
    private String buildAppointmentEmailHtml(String clientName, String appointmentDate, 
                                             String serviceName, String professionalName) {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "  <meta charset='UTF-8'>" +
                "  <style>" +
                "    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }" +
                "    .container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
                "    .header { background: #9b59b6; color: white; padding: 20px; text-align: center; border-radius: 5px; }" +
                "    .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px; }" +
                "    .details { background: white; border-left: 4px solid #9b59b6; padding: 15px; margin: 15px 0; }" +
                "    .footer { font-size: 12px; color: #999; text-align: center; margin-top: 30px; }" +
                "  </style>" +
                "</head>" +
                "<body>" +
                "  <div class='container'>" +
                "    <div class='header'>" +
                "      <h1>Cita Confirmada</h1>" +
                "    </div>" +
                "    <div class='content'>" +
                "      <p>Hola " + clientName + ",</p>" +
                "      <p>¡Tu cita ha sido confirmada en AuraSpa!</p>" +
                "      <div class='details'>" +
                "        <p><strong>Servicio:</strong> " + serviceName + "</p>" +
                "        <p><strong>Profesional:</strong> " + professionalName + "</p>" +
                "        <p><strong>Fecha y Hora:</strong> " + appointmentDate + "</p>" +
                "      </div>" +
                "      <p>Te esperamos pronto. Si necesitas cancelar o reprogramar, por favor contactanos.</p>" +
                "    </div>" +
                "    <div class='footer'>" +
                "      <p>&copy; 2024 AuraSpa. Todos los derechos reservados.</p>" +
                "    </div>" +
                "  </div>" +
                "</body>" +
                "</html>";
    }
    
    private String buildWelcomeEmailHtml(String userName) {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "  <meta charset='UTF-8'>" +
                "  <style>" +
                "    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }" +
                "    .container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
                "    .header { background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%); color: white; padding: 20px; text-align: center; border-radius: 5px; }" +
                "    .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px; }" +
                "    .footer { font-size: 12px; color: #999; text-align: center; margin-top: 30px; }" +
                "  </style>" +
                "</head>" +
                "<body>" +
                "  <div class='container'>" +
                "    <div class='header'>" +
                "      <h1>¡Bienvenido a AuraSpa!</h1>" +
                "    </div>" +
                "    <div class='content'>" +
                "      <p>Hola " + userName + ",</p>" +
                "      <p>¡Gracias por registrarte en AuraSpa! Estamos emocionados de tenerte con nosotros.</p>" +
                "      <p>Para comenzar, verifica tu correo electrónico usando el enlace que te enviamos.</p>" +
                "      <p>Una vez verificado, podrás:</p>" +
                "      <ul>" +
                "        <li>Explorar nuestros servicios</li>" +
                "        <li>Agendar citas</li>" +
                "        <li>Acceder a tu perfil</li>" +
                "      </ul>" +
                "      <p>¡Que disfrutes la experiencia AuraSpa!</p>" +
                "    </div>" +
                "    <div class='footer'>" +
                "      <p>&copy; 2024 AuraSpa. Todos los derechos reservados.</p>" +
                "    </div>" +
                "  </div>" +
                "</body>" +
                "</html>";
    }
}
