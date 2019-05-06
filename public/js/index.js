$(function() {
	var isVisible = false
	$('.burger').click(() => {
		if (isVisible === false) {
			$('#navbar').css('transform', 'translateX(0)')
			$('.bar').css('background-color', '#FFF')
			$('#bar2').css('opacity', '0')
			$('#bar1').css('transform', 'rotate(45deg) translateY(15px)')
			$('#bar3').css('transform', 'rotate(-45deg) translateY(-15px)')
			isVisible = true
		} else if (isVisible === true) {
			$('#navbar').css('transform', 'translateX(-240px)')
			$('.bar').css('background-color', '#188fa7')
			$('#bar2').css('opacity', '1')
			$('#bar1').css('transform', 'rotate(0) translateY(0)')
			$('#bar3').css('transform', 'rotate(0) translateY(0)')
			isVisible = false
		}
	})

	$('#password, #confirmPassword').on('keyup', () => {
		if ($('#password').val() === $('#confirmPassword').val()) {
			if ($('#password').val().length >= 8) {
				$('#isValid').html('Mot de passe validé').css('color', '#9BC53D')
			}
		} else {
			$('#isValid').html('Mot de passe invalide').css('color', '#C3423F')
		}
	})

	$('#register').click(() => {
		$('#signup').css('transform', 'translateX(0)')
		$('#signup').css('opacity', '1')
		$('#inboxRegister').addClass('activeLink')
		$('#inboxRegister').removeClass('inactiveLink')
		$('#inboxLogin').addClass('inactiveLink')
		$('#inboxLogin').removeClass('activeLink')
		$('#registerForm').css('display', 'block')
		$('#loginForm').css('display', 'none')
	})
	
	$('#login').click(() => {
		$('#signup').css('transform', 'translateX(0)')
		$('#signup').css('opacity', '1')
		$('#inboxLogin').addClass('activeLink')
		$('#inboxLogin').removeClass('inactiveLink')
		$('#inboxRegister').addClass('inactiveLink')
		$('#inboxRegister').removeClass('activeLink')
		$('#registerForm').css('display', 'none')
		$('#loginForm').css('display', 'block')
	})

	$('#inboxLogin').click(() => {
		$('#inboxLogin').addClass('activeLink')
		$('#inboxLogin').removeClass('inactiveLink')
		$('#inboxRegister').addClass('inactiveLink')
		$('#inboxRegister').removeClass('activeLink')
		$('#registerForm').css('display', 'none')
		$('#loginForm').css('display', 'block')
	})
	
	$('#inboxRegister').click(() => {
		$('#inboxRegister').addClass('activeLink')
		$('#inboxRegister').removeClass('inactiveLink')
		$('#inboxLogin').addClass('inactiveLink')
		$('#inboxLogin').removeClass('activeLink')
		$('#registerForm').css('display', 'block')
		$('#loginForm').css('display', 'none')
	})

	$('input[type=submit]').click((e) => {
		e.preventDefault()
	})
}) 
