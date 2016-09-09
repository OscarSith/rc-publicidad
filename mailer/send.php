<?php
header('Access-Control-Allow-Origin: http://localhost:4000');

function sendMessage($values, $message, $subject) {
    require 'PHPMailerAutoload.php';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Host = 'localhost';
        $mail->SMTPSecure = 'tls';
        $mail->Username = '';
        $mail->Password = '';
        $mail->CharSet = 'UTF-8';

        $mail->From = $values['correo'];

        if (isset($values['nombre_apellido'])) {
            $mail->FromName = $values['nombre_apellido'];
        }

        $mail->addAddress('rcsialer1@hotmail.com', 'Información');
        if (isset($values['cc'])) {
            $mail->addAddress($values['correo'], $values['nombre_apellido']);

        }
        //$mail->addCC($values['correo'], $values['nombre']);
        //$mail->addReplyTo('no-reply@allmark.pe', 'Allmark');

        $mail->isHTML(true);

        $mail->Subject = $subject;
        $mail->Body = $message;
        $mail->AltBody = $values['mensaje'];

        if (!$mail->send()) {
            return 'El mensaje no pudo ser enviado, intentelo de nuevo, error: ' . $mail->ErrorInfo;
        } else {
            echo json_encode(['success_message' => 'Tu mensaje ha sido enviado']);
            exit;
        }

    } catch (phpmailerException $pex) {
        return $pex->getMessage();
    }
}

$error_message = '';
if ($_POST['type'] === 'home') {
    $params = array(
        'nombre_apellido' => FILTER_SANITIZE_STRING,
        'correo' => FILTER_VALIDATE_EMAIL,
        'producto' => FILTER_SANITIZE_STRING,
        'mensaje' => FILTER_SANITIZE_STRING,
        'cantidad' => FILTER_VALIDATE_INT
    );

    $values = filter_input_array(INPUT_POST, $params);

    if (empty($values['nombre_apellido'])) {
        $error_message = 'El nombre es requerido';
    } else if (!$values['correo']) {
        $error_message = 'Debe poner un email válido';
    } else if (empty($values['producto'])) {
        $error_message = 'Escoja el producto';
    } else if (empty($values['mensaje'])) {
        $error_message = 'Debe escribir su mensaje';
    } else if (!$values['cantidad']) {
        $error_message = 'Escribe la cantidad';
    } else {
        $message = nl2br('<br><b>Correo:</b> ' . $values['correo'] . '<br><b>Producto:</b> ' . $values['producto'] . '<br><br><blockquote style="border-left:5px solid #CCC;padding: 4px 7px;">' . $values['mensaje'] . '</blockquote>');
        $error_message = sendMessage($values, $message, 'Cotización enviada desde la página web');
    }
} else if ($_POST['type'] === 'contact') {
    $params = array(
        'correo' => FILTER_VALIDATE_EMAIL,
        'mensaje' => FILTER_SANITIZE_STRING,
    );

    $values = filter_input_array(INPUT_POST, $params);

    if (!$values['correo']) {
        $error_message = 'Debe poner un email válido';
    } else if (empty($values['mensaje'])) {
        $error_message = 'Debe escribir su mensaje';
    } else {
        $message = '<br><b>Correo:</b> ' . $values['correo'] . '<br><br><blockquote style="border-left:5px solid #CCC;padding: 4px 7px;">' . nl2br($values['mensaje']) . '</blockquote>';
        $error_message = sendMessage($values, $message, 'Mensaje enviado desde la página web');
    }
} else {
    $error_message = 'Operación desconocida';
}

http_response_code(412);
echo json_encode(['error_message' => $error_message]);
exit;