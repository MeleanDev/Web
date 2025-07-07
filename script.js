

$(document).ready(function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Typing effect for terminal
    const commands = [
        'ls -la projects/',
        'git status',
        'npm run build',
        'php artisan serve',
        'mysql -u root -p'
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newCommandDelay = 2000;
    
    function typeCommand() {
        const currentCommand = commands[commandIndex];
        const typingElement = $('.typing-text');
        
        if (charIndex < currentCommand.length) {
            typingElement.text(currentCommand.substring(0, charIndex + 1));
            charIndex++;
            setTimeout(typeCommand, typingSpeed);
        } else {
            setTimeout(eraseCommand, newCommandDelay);
        }
    }
    
    function eraseCommand() {
        const currentCommand = commands[commandIndex];
        const typingElement = $('.typing-text');
        
        if (charIndex > 0) {
            typingElement.text(currentCommand.substring(0, charIndex - 1));
            charIndex--;
            setTimeout(eraseCommand, erasingSpeed);
        } else {
            commandIndex = (commandIndex + 1) % commands.length;
            setTimeout(typeCommand, typingSpeed);
        }
    }
    
    // Start typing effect
    setTimeout(typeCommand, 1000);

    // Navbar scroll effect
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        const navbar = $('#mainNav');
        
        if (scrollTop > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });

    // Smooth scrolling
    $('a[href^="#"]').on('click', function(event) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000, 'easeInOutExpo');
        }
    });

    // Active navigation highlighting
    $(window).scroll(function() {
        const scrollDistance = $(window).scrollTop();
        
        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance + 100) {
                $('.navbar-nav a.active').removeClass('active');
                $('.navbar-nav a').eq(i).addClass('active');
            }
        });
    });

    // Matrix background animation
    function createMatrixRain() {
        const canvas = $('<canvas>').attr({
            width: window.innerWidth,
            height: window.innerHeight
        }).css({
            position: 'absolute',
            top: 0,
            left: 0,
            'pointer-events': 'none',
            opacity: 0.1,
            'z-index': -1
        });
        
        $('.matrix-bg').append(canvas);
        
        const ctx = canvas[0].getContext('2d');
        const chars = '01';
        const fontSize = 14;
        const columns = Math.floor(window.innerWidth / fontSize);
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas[0].width, canvas[0].height);
            
            ctx.fillStyle = '#00ff88';
            ctx.font = fontSize + 'px JetBrains Mono';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas[0].height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 100);
    }
    
    // Initialize matrix rain
    createMatrixRain();

    // Skill tags hover effect
    $('.skill-tag').hover(
        function() {
            $(this).css('transform', 'translateY(-5px) scale(1.05)');
        },
        function() {
            $(this).css('transform', 'translateY(0) scale(1)');
        }
    );

    // Project cards interaction
    $('.project-card').hover(
        function() {
            $(this).find('.project-title').css('color', 'var(--accent-green)');
        },
        function() {
            $(this).find('.project-title').css('color', 'var(--text-primary)');
        }
    );

    // Terminal window interaction
    $('.terminal-window').on('click', function() {
        $(this).addClass('focused');
        setTimeout(() => {
            $(this).removeClass('focused');
        }, 2000);
    });

    // Code window syntax highlighting animation
    function animateCodeHighlight() {
        $('.code-line').each(function(index) {
            $(this).css('opacity', '0.3');
            setTimeout(() => {
                $(this).css('opacity', '1');
            }, index * 200);
        });
    }

    // Trigger code animation when in view
    let codeAnimated = false;
    $(window).scroll(function() {
        const codeSection = $('.code-preview');
        if (codeSection.length && !codeAnimated) {
            const sectionTop = codeSection.offset().top;
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            if (scrollTop + windowHeight > sectionTop + 100) {
                animateCodeHighlight();
                codeAnimated = true;
            }
        }
    });

    // Mobile menu toggle
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking on links
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
            $('.navbar-toggler').removeClass('active');
        }
    });

    // Parallax effect for hero section
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const parallax = $('.hero-section');
        const speed = scrolled * 0.2;
        
        parallax.css('transform', 'translateY(' + speed + 'px)');
    });

    // Add glitch effect to hero title
    function addGlitchEffect() {
        const title = $('.hero-title');
        title.addClass('glitch');
        setTimeout(() => {
            title.removeClass('glitch');
        }, 200);
    }

    // Random glitch effect
    setInterval(addGlitchEffect, 10000);

    // Terminal cursor blink
    setInterval(function() {
        $('.cursor').toggle();
    }, 500);

    // Resize handler
    $(window).resize(function() {
        // Recreate matrix rain on resize
        $('.matrix-bg canvas').remove();
        createMatrixRain();
    });

    // Performance optimization
    let ticking = false;
    
    function updateOnScroll() {
        // Scroll-dependent updates here
        ticking = false;
    }
    
    $(window).scroll(function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Add loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
        
        // Stagger animation for elements
        $('.hero-content > *').each(function(index) {
            $(this).css({
                'animation-delay': (index * 0.2) + 's',
                'animation-fill-mode': 'both'
            }).addClass('fadeInUp');
        });
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    $(document).keydown(function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated
            $('body').addClass('matrix-mode');
            setTimeout(() => {
                $('body').removeClass('matrix-mode');
            }, 5000);
        }
    });
});

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Custom easing for jQuery animations
$.easing.easeInOutExpo = function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
};