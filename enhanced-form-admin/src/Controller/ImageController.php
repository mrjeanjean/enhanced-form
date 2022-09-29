<?php


namespace App\Controller;


use Imagine\Gd\Imagine;
use Imagine\Image\Box;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\UrlHelper;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Routing\Annotation\Route;

class ImageController extends AbstractController
{
    #[Route('/upload', name: 'upload', methods: 'POST')]
    public function upload(Request $request, SluggerInterface $slugger, UrlHelper $urlHelper)
    {
        /** @var UploadedFile $file */
        $file = $request->files->get('file');


        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename . '_' . uniqid() . '.' . $file->guessClientExtension();

        try {
            $file->move(
                $this->getParameter('upload_directory'),
                $newFilename
            );
        } catch (FileException $e) {
            // handle exception if something happens during file upload
        }

        return new JsonResponse(
            [
                'error' => false,
                'url' => $urlHelper->getAbsoluteUrl($this->getParameter('upload_directory_name') . '/' . $newFilename)
            ]
        );
    }
}
