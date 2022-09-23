<?php
namespace App\Field;

use App\Form\EnhancedFormType;
use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\FieldTrait;

class EnhancedFormField implements FieldInterface
{
    use FieldTrait;

    public static function new(string $propertyName, ?string $label = null)
    {
        return (new self())
            ->setProperty($propertyName)
            ->setFormType(EnhancedFormType::class)
            ->addJsFiles('js/admin.js')
            ->addCssFiles('js/admin.css')
            ;
    }
}
