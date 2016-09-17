
<head>
	<Title>SIPA - Pedido <?php echo $_GET['ped']?></Title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 

</head>
<BODY STYLE="font-family:arial,helvetica,'Arial'" " onload="window.print()"> 
	<style type="text/css">
		table{
			font-size : small !important;
			color : black;
		}
		.borderCustom{
			border-style: solid;
			border-width: 1px;
			border-bottom: none;
			border-color: #000000;
		}
	</style>

	<?php
	$ped=$_GET['ped'];
	$type=$_GET['type'];

	require_once '../services/conexion.php';
	include ("funciones.php");


	$conexion = new Conexion();

// Consultar Interventor
	$sql="select us.id, us.nombre, us.telefono, us.mail, us.movil from rol, usuario as us where interventor=us.id";
	$resultado = $conexion->mysqli->query($sql);

//Mostrar resultados

	while ($row = $resultado->fetch_assoc()) {
			$interventor=$row['nombre'];
			$celinterventor=format_cel_num($row['movil']);
			$telinterventor=format_tel_num($row['telefono']);
			$mailinterventor=$row['mail'];
		}


//Consultar datos del pedido

			$sql="SELECT ped.id, ped.idppto,
			ped.idsecretaria,
			ped.estado,
			ped.fchentrega,
			ped.direccion as direcc, 
			ped.idusuario, 
			ped.evento,
			ped.hora, 
			ped.comentario,
			ped.idalimento, 
			ped.personarecibe,
			ped.telfjorecibe,
			ped.movilrecibe,
			ped.cantidad,
			ped.valorpedido,
			ali.nombre nombrealimento,
			ali.descripcion,
			ali.valor,
			sec.secretaria,
			us.nombre,
			us.telefono,
			us.mail,
			us.movil,
			prov.proveedor,
			prov.direccion,
			prov.email,
			prov.telefono as telprov,
			ppto.contrato

			FROM 
			pedido as ped,
			usuario as us, 
			secretaria as sec, 
			proveedor as prov, 
			tipoalimento as tipo, 
			alimento as ali,
			presupuesto as ppto

			WHERE
			ped.id =($ped) and
			ped.idalimento=ali.id and
			ped.idsecretaria=sec.id and
			ped.idtalimento=tipo.id and
			ped.idusuario=us.id and
			prov.id=tipo.idproveedor and
			ped.idppto=ppto.id";

			$resultado = $conexion->mysqli->query($sql);

//Mostrar resultados

			while ($row = $resultado->fetch_assoc()) {
//si esta anulado
					if($row['estado']==1)
					{
						?><SPAN ID="capa" STYLE="position:absolute; top:280; left:200">
						<font size=30 color=red><img src='images/pedido anulado.png'>
						</SPAN><?php

					}?>

<table width="630" border="0" align="center" style="background: url(images/barraFondo.jpg) no-repeat"> 

									<tr><td>Se&ntilde;ores<br><b><?php echo $row['proveedor']?></b><br><?php echo $row['direccion']?> (Comutador: <?php echo $row['telprov']?>)<br> Medell&iacute;n 
										<p align=justify>Cordial saludo, favor proceder de acuerdo al contrato <?php echo $row['contrato']?>, y suministrar la siguiente solicitud de servicio, teniendo en cuenta la calidad de los productos y oportunidad en la entrega.
											<br></p>
										</td></tr>
										<tr><td align=center>

											<table  border=1 cellspacing=0>

												<tr><th colspan=2><font size=3><?php echo ($row['secretaria'])?> - Despacho Nro.<font size=3><?php echo $row['id']?> </th></tr>
												<tbody bgcolor='#ffffff' style='font-size:50'>

													<colgroup>
													<col width="6" align=center>
													<col bgcolor='#ffffff'  >
												</colgroup>


												<tr>
													<td rowspan=2><b>Entrega:</td>
													<td><b>Fecha: </b><?php echo fch_mysql_fchlarga($row['fchentrega'])?>; <b>Hora: </b><?php echo ($row['hora'])?>
													</td>
												</tr>
												<tr><td><b>Direcci&oacute;n: </b><?php echo ($row['direcc'])?>; <b>Evento:</b> <?php echo ($row['evento'])?></td></tr>

												<tr><td rowspan=2><b>Recibe:</td><td><b><?php echo ($row['personarecibe'])?></td></tr>
												<tr><td <?php echo $fonttable?>><b>Tel Fijo: </b><?php echo format_tel_num($row['telfjorecibe'])?> <b> Movil: </b> <?php echo format_cel_num($row['movilrecibe'])?></td></tr>


												<tr><td rowspan=3><b>Detalle: </td><td><small align=justify><b>Item:</b> <?php echo ($row['nombrealimento'])?>: <?php echo ($row['descripcion']);if($row['comentario']!=''){echo "<br>Nota: ".($row['comentario']);}?></small></td></tr><small>
												<tr><td><b>Cantidad:</b> <?php echo number_format($row['cantidad'], 0, '', '.')?>; <b>Vr./U sin IVA:</b> $<?php echo number_format(round($row['valor'],0), 0, '', '.')?>; <b>Vr. Total: </b> $<?php echo number_format($row['valorpedido'], 0, '', '.')?></td></tr></small>
												<tr><td><b>Nro. del Pedido-Proyecto: <?php echo ($row['idppto'])?></td></tr>

												<tr><td rowspan=2><b>Interventor <br> Operativo:</td><td><b><?php echo ($row['nombre'])?></td></tr>
												<tr><td><b>Tel Fijo: </b> <?php echo format_tel_num($row['telefono'])?> <b>Movil: </b><?php echo format_cel_num($row['movil'])?> <b>Mail: </b><?php echo $row['mail']?></td></tr>

												<tr><td rowspan=2><b>Interventor Adiministrativo:</td><td><?php  echo $interventor?></td></tr>
												<tr><td><b>Tel Fijo:</b> <?php  echo $telinterventor?> <b>Movil: </b><?php  echo $celinterventor?>  <b>Mail: </b> <?php echo $mailinterventor?></td></tr>
												<tbody>
												</table >

												<tr><td><br></td></tr>
											</td></tr>

											<?php //Remisi&oacute;n?>
											<tr><td>
												<table  border=1 rules=groups cellspacing=0 <?php if($type==1){echo "style='display:none'";}?>>

													<tr><td colspan=2 align=center>

														<table align=center border=0 width="630" cellspacing=0>

															<tr><td align=center bgcolor='#ffffff' rowspan=3><img width=110 height=90 src='../img/logo-cliente.png?1'></td><td ><b>Direccion: </b><?php echo $row['direccion']?><br> <b> Comutador: </b><?php echo $row['telprov']?><br><b>E-mail: </b><?php echo $row['email']?></td><td align=left><b>Remisi&oacute;n Nro. </b>_________</td></tr>
															<tr><td colspan=2><hr noshade="noshade" size="1"/> 
															</td></tr>
															<tr><td align=left colspan=1>Se&ntilde;ores:<br> <b>Municipio de Medell&iacute;n </b><br> <?php echo ($row['secretaria'])?> </td><td><b>Pedido:</b><?php echo $row['id']?><br><b>Fecha: </b><?php echo ($row['fchentrega'])?> <br><b>Hora: </b><?php echo ($row['hora'])?> </td></tr>

															<tr><td colspan=3><br></td></tr>

														</table>
														
														<colgroup>
														<col width="6" align=center>
														<col bgcolor='#ffffff'  >
													</colgroup>

													<tr><td rowspan=2><b>Entrega:</td><td></td></tr>
													<tr><td colspan=2><b>Direcci&oacute;n: </b>Medell&iacute;n, <?php echo ($row['direcc'])?><br> <b>Evento:</b> <?php echo (($row['evento']))?><br><b></td></tr>

												</td></tr>

												<tr><td colspan=3><hr noshade="noshade" size="1" valign=top/>

													<tr><td rowspan=3><b>Detalle: </td><td><small align='justify' ><b>Item:</b> <?php echo ($row['nombrealimento'])?>: <?php echo ($row['descripcion']);if($row['comentario']!=''){echo "<br>Nota: ".($row['comentario']);}?></small></td></tr>
													<tr><td><b>Cantidad:</b> <?php echo number_format($row['cantidad'], 0, '', '.')?>; <b>Vr./U sin IVA:</b> $<?php echo number_format(round($row['valor'],0), 0, '', '.')?>; <b>Vr. Total: </b> $<?php echo number_format($row['valorpedido'], 0, '', '.')?></td></tr>
													<tr><td><b>Nro. del Pedido-Proyecto: <?php echo ($row['idppto'])?><br></td></tr>
													<tr>
														<td rowspan=2><b>Recibido:</td><td>

														<tr>
															<td>
																<table border=0 rules=cols class="borderCustom" width='100%'>
																	<tr>
																		<td rowspan=3><br>______________________<font color=ffffff>_</font><br>
																			<font size=1><?php echo ($row['personarecibe'])?></b><br>
																				<font size=1>CC:</font>
																			</td>
																			<td rowspan=3 width="40%" valign=bottom>_________________________<br>
																				<font size=1>V.B. <?php echo ($row['nombre'])?><br>
																					<font size=1>Solicitado</font>
																				</td>

																				<td rowspan=3 valign=top width="40%" align=left><font size=1>Despachado:</font>
																				</td>
																				<td rowspan=3 valign=top width="40%" align=left><font size=1>Transportado:</font>
																				</td>
																				<td rowspan=3 valign=top width="40%" align=left><font size=1>Entregado:</font>
																				</td>
																			</tr>

																		</table >
																	</td>
																</tr>

															</td>
														</tr>
													</table>


			<?php }//fin while
			$conexion->close($resultado);

?>
	