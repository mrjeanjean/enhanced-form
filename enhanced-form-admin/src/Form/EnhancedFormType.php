<?php

namespace App\Form;

use App\Entity\Post;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EnhancedFormType extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
            [
                'compound'   => false
            ]
        );
    }

    public function getBlockPrefix()
    {
        return 'enhanced_form';
    }
}
